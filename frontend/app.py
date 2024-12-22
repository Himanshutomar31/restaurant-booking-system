import streamlit as st
import requests
import uuid
import os

BASE_URL = os.getenv("API_URL", "http://localhost:3000") 

# Initialize session state only if it's not already set
if 'session_id' not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False

# Registration
def register_user(username, email, password):
    try:
        response = requests.post(f"{BASE_URL}/api/register", json={
            'username': username,
            'email': email,
            'password': password,
        })
        response.raise_for_status()
        st.success("Registered successfully! Please log in.")
        # Instead of rerunning, suggest the user login
    except requests.exceptions.RequestException as e:
        st.error(f"Error: {e}")

# Login
def login_user(email, password):
    try:
        response = requests.post(f"{BASE_URL}/api/login", json={
            'email': email,
            'password': password
        })
        response.raise_for_status()
        data = response.json()
        st.session_state.session_id = data['session_id']
        st.session_state.user_id = data['id']
        st.session_state.logged_in = True
        st.success("Login successful!")
        st.rerun()  # Trigger a rerun to refresh UI after login
    except requests.exceptions.RequestException as e:
        st.error(f"Error: {e}")

# Logout
def logout_user():
    st.session_state.session_id = None
    st.session_state.logged_in = False
    st.success("Logged out successfully!")
    st.rerun()  # Trigger a rerun to refresh UI after logout

# UI Components
st.title("Restaurant Booking System")

# Display login/register options only if not logged in
if not st.session_state.logged_in:
    option = st.selectbox("Choose an option", ["Login", "Register"])

    if option == "Register":
        username = st.text_input("Username")
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")
        if st.button("Register"):
            register_user(username, email, password)

    elif option == "Login":
        email = st.text_input("Email")
        password = st.text_input("Password", type="password")
        if st.button("Login"):
            login_user(email, password)

else:
    # If logged in, hide login/register UI and display the rest of the system
    st.write(f"Welcome! User ID: {st.session_state.user_id}")

    if st.button("Logout"):
        logout_user()

    # Search Menu Items
    st.header("Search for Menu Items")
    search_query = st.text_input("Search for dishes...")

    if search_query:
        try:
            response = requests.get(f"{BASE_URL}/api/search", params={'query': search_query})
            response.raise_for_status()
            search_results = response.json()
            if search_results:
                st.write("Search Results:")
                for item in search_results["menuItems"]:
                    st.write(f"ID: {item['id']} | Name: {item['title']} | Price: ${item['price']}")
                    if st.button(f"Add {item['title']} to Cart", key=f"add_{item['id']}"):
                        quantity = st.number_input("Quantity", min_value=1, step=1, key=f"quantity_{item['id']}")
                        if quantity > 0:
                            try:
                                response = requests.post(f"{BASE_URL}/api/cart", json={
                                    'user_id': st.session_state.user_id,
                                    'menu_item_id': item['id'],
                                    'quantity': quantity
                                })
                                response.raise_for_status()
                                st.success(f"{item['title']} added to cart!")
                            except requests.exceptions.RequestException as e:
                                st.error(f"Error: {e}")
            else:
                st.warning("No items found.")
        except requests.exceptions.RequestException as e:
            st.error(f"Error: {e}")

    # Cart Management
    st.header("Cart Management")
    
    # View Cart
    if st.button("View Cart"):
        try:
            response = requests.get(f"{BASE_URL}/api/cart/{st.session_state.user_id}")
            response.raise_for_status()
            cart = response.json()
            if cart:
                st.write(cart)
            else:
                st.write("Your cart is empty.")
        except requests.exceptions.RequestException as e:
            st.error(f"Error: {e}")

    # Get Total Bill
    if st.button("Get Total Bill"):
        try:
            response = requests.get(f"{BASE_URL}/api/cart/{st.session_state.user_id}/total")
            response.raise_for_status()
            total = response.json()
            st.write(f"Bill: ${round(total['total'],3)}")
            st.write(f"Tax: ${round(total['tax'],3)}")
            st.write(f"final Bill: ${round(total['finalTotal'],2)}")
        except requests.exceptions.RequestException as e:
            st.error(f"Error: {e}")
