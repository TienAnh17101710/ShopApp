package com.shopapp.service;

import com.shopapp.dto.ProductDTO;
import com.shopapp.model.Product;
import com.shopapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }
    
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setProductCode(productDTO.getProductCode());
            product.setProductName(productDTO.getProductName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setQuantity(productDTO.getQuantity());
            product.setActive(productDTO.getActive());
            Product updatedProduct = productRepository.save(product);
            return convertToDTO(updatedProduct);
        }
        throw new RuntimeException("Product not found with id: " + id);
    }
    
    public ProductDTO getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(this::convertToDTO)
                     .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }
    
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                               .stream()
                               .map(this::convertToDTO)
                               .collect(Collectors.toList());
    }
    
    public List<ProductDTO> getActiveProducts() {
        return productRepository.findByActive(true)
                               .stream()
                               .map(this::convertToDTO)
                               .collect(Collectors.toList());
    }
    
    public List<ProductDTO> searchByProductName(String productName) {
        return productRepository.findByProductNameContainingIgnoreCase(productName)
                               .stream()
                               .map(this::convertToDTO)
                               .collect(Collectors.toList());
    }
    
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
    
    public ProductDTO deactivateProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            p.setActive(false);
            Product updatedProduct = productRepository.save(p);
            return convertToDTO(updatedProduct);
        }
        throw new RuntimeException("Product not found with id: " + id);
    }
    
    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setProductCode(product.getProductCode());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        dto.setActive(product.getActive());
        return dto;
    }
    
    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setProductCode(dto.getProductCode());
        product.setProductName(dto.getProductName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setActive(dto.getActive() != null ? dto.getActive() : true);
        return product;
    }
}
