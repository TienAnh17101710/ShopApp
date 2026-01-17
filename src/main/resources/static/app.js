const API_URL = 'http://localhost:8080/products';

// Create Product
document.getElementById('productForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageDiv = document.getElementById('createMessage');
    
    const productData = {
        productCode: document.getElementById('productName').value.toUpperCase().replace(/\s+/g, '-'),
        productName: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        quantity: parseInt(document.getElementById('productQuantity').value),
        active: true
    };

    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            throw new Error('Server returned non-JSON response: ' + text.substring(0, 100));
        }
        
        console.log('Create response:', data);
        
        if (data && data.success) {
            messageDiv.textContent = '✓ ' + (data.message || 'Product created successfully');
            messageDiv.className = 'message success';
            document.getElementById('productForm').reset();
            setTimeout(() => {
                messageDiv.className = 'message';
            }, 3000);
            getAllProducts();
        } else {
            const errorMsg = data?.message || 'Failed to create product';
            messageDiv.textContent = '✗ ' + errorMsg;
            messageDiv.className = 'message error';
            console.error('Create failed:', errorMsg, data);
        }
    } catch (error) {
        console.error('Create error:', error);
        messageDiv.textContent = '✗ Error: ' + error.message;
        messageDiv.className = 'message error';
    }
});

// Get Product by ID
async function getProduct() {
    const id = document.getElementById('searchId').value;
    const messageDiv = document.getElementById('searchMessage');
    const detailsDiv = document.getElementById('productDetails');

    if (!id) {
        messageDiv.textContent = '✗ Please enter a Product ID';
        messageDiv.className = 'message error';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        if (data.success) {
            displayProductDetails(data.data, detailsDiv);
            messageDiv.className = 'message';
        } else {
            messageDiv.textContent = '✗ ' + data.message;
            messageDiv.className = 'message error';
            detailsDiv.classList.remove('show');
        }
    } catch (error) {
        messageDiv.textContent = '✗ Error: ' + error.message;
        messageDiv.className = 'message error';
        detailsDiv.classList.remove('show');
    }
}

function displayProductDetails(product, container) {
    container.innerHTML = `
        <h3>${product.productName}</h3>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <p><strong>Code:</strong> ${product.productCode}</p>
        <p><strong>Description:</strong> ${product.description || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
        <p><strong>ID:</strong> ${product.id}</p>
    `;
    container.classList.add('show');
}

// Get All Products
async function getAllProducts() {
    const listDiv = document.getElementById('productList');
    const messageDiv = document.getElementById('listMessage');

    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
            listDiv.innerHTML = '';
            data.data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-item';
                productElement.innerHTML = `
                    <div class="product-info">
                        <h3>${product.productName}</h3>
                        <p><strong>Code:</strong> ${product.productCode}</p>
                        <p><strong>Price:</strong> <span class="product-price">$${product.price.toFixed(2)}</span></p>
                        <p><strong>Description:</strong> ${product.description || 'N/A'}</p>
                        <p><strong>Quantity:</strong> ${product.quantity}</p>
                        <p><strong>ID:</strong> ${product.id}</p>
                    </div>
                    <div class="product-actions">
                        <button onclick="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
                    </div>
                `;
                listDiv.appendChild(productElement);
            });
            messageDiv.className = 'message';
        } else {
            listDiv.innerHTML = '<div class="empty-state"><p>No products found. Create one to get started!</p></div>';
            messageDiv.className = 'message';
        }
    } catch (error) {
        messageDiv.textContent = '✗ Error loading products: ' + error.message;
        messageDiv.className = 'message error';
    }
}

// Delete Product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        
        if (data.success) {
            alert('✓ Product deleted successfully');
            getAllProducts();
        } else {
            alert('✗ ' + data.message);
        }
    } catch (error) {
        alert('✗ Error: ' + error.message);
    }
}

// Load all products on page load
document.addEventListener('DOMContentLoaded', () => {
    getAllProducts();
});
