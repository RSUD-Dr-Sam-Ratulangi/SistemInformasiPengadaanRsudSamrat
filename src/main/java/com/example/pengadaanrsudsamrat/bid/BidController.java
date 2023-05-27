package com.example.pengadaanrsudsamrat.bid;


import com.example.pengadaanrsudsamrat.ProductRequest.DTO.ProductRequestRequestDTO;
import com.example.pengadaanrsudsamrat.ProductRequest.ProductRequestModel;
import com.example.pengadaanrsudsamrat.ProductRequest.ProductRequestRepository;
import com.example.pengadaanrsudsamrat.vendor.DTO.VendorResponseDTO;
import com.example.pengadaanrsudsamrat.bid.DTO.BidDTO;
import com.example.pengadaanrsudsamrat.bid.DTO.BidResponseDTO;
import com.example.pengadaanrsudsamrat.bid.DTO.CreateBidResponseDTO;
import com.example.pengadaanrsudsamrat.products.ProductRepository;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import com.example.pengadaanrsudsamrat.vendor.VendorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * The type Bid controller.
 */
@RestController
@RequestMapping("/pengadaan/dev/v1/bids")
public class BidController {

    private final BidService bidService;
    private final VendorRepository vendorRepository;
    private final BidRepository bidRepository;
    private final ProductRequestRepository productRequestRepository;
    private final ModelMapper modelMapper;

    /**
     * Instantiates a new Bid controller.
     *
     * @param bidService               the bid service
     * @param vendorRepository         the vendor repository
     * @param bidRepository            the bid repository
     * @param productRepository        the product repository
     * @param productRequestRepository the product request repository
     * @param modelMapper              the model mapper
     */
    public BidController(BidService bidService, VendorRepository vendorRepository, BidRepository bidRepository, ProductRepository productRepository, ProductRequestRepository productRequestRepository, ModelMapper modelMapper) {
        this.bidService = bidService;
        this.vendorRepository = vendorRepository;
        this.bidRepository = bidRepository;
        this.productRequestRepository = productRequestRepository;

        this.modelMapper = modelMapper;
    }

    /**
     * Gets bid by id.
     *
     * @param id the id
     * @return the bid by id
     */
    @GetMapping("/{id}")
    public BidModel getBidById(@PathVariable("id") Long id) {
        BidDTO bidDTO = bidService.getBidById(id);
        return modelMapper.map(bidDTO, BidModel.class);
    }

    /**
     * Gets all bids by product request id.
     *
     * @param productRequestId the product request id
     * @return the all bids by product request id
     */
    @GetMapping("/product/{productRequestId}")
    public List<BidResponseDTO> getAllBidsByProductRequestId(@PathVariable("productRequestId") Long productRequestId) {
        List<BidDTO> bidDTOs = bidService.getAllBidsByProductRequestId(productRequestId);
        return bidDTOs.stream()
                .map(bidDTO -> {
                    VendorModel vendor = vendorRepository.findById(bidDTO.getVendorId())
                            .orElseThrow(() -> new EntityNotFoundException("Vendor not found with id " + bidDTO.getVendorId()));
                    ProductRequestModel productRequest = productRequestRepository.findById(bidDTO.getProductRequestId())
                            .orElseThrow(() -> new EntityNotFoundException("Product request not found with id " + bidDTO.getProductRequestId()));

                    BidResponseDTO response = modelMapper.map(bidDTO, BidResponseDTO.class);
                    response.setVendor(vendor);
                    response.setProductRequest(productRequest);

                    return response;
                })
                .collect(Collectors.toList());
    }


    /**
     * Create bid response entity.
     *
     * @param bidDTO the bid dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<CreateBidResponseDTO> createBid(@RequestBody BidDTO bidDTO) {
        if (bidDTO.getVendorId() == null) {
            return ResponseEntity.badRequest().body(new CreateBidResponseDTO(null, null, null, 0, false, "Vendor ID cannot be null"));
        }
        VendorModel vendor = vendorRepository.findById(bidDTO.getVendorId())
                .orElseThrow(() -> new EntityNotFoundException("Vendor not found with id " + bidDTO.getVendorId()));
        if (bidDTO.getProductRequestId() == null) {
            return ResponseEntity.badRequest().body(new CreateBidResponseDTO(null, null, null, 0, false, "Product Request ID cannot be null"));
        }
        ProductRequestModel productRequest = productRequestRepository.findById(bidDTO.getProductRequestId())
                .orElseThrow(() -> new EntityNotFoundException("Product Request not found with id " + bidDTO.getProductRequestId()));
        CreateBidResponseDTO createBidResponseDTO = bidService.createBid(bidDTO);
        createBidResponseDTO.setVendor(modelMapper.map(vendor, VendorResponseDTO.class));
        createBidResponseDTO.setProductRequest(modelMapper.map(productRequest, ProductRequestRequestDTO.class));
        return ResponseEntity.ok(createBidResponseDTO);
    }


    /**
     * Update bid bid model.
     *
     * @param id       the id
     * @param bidModel the bid model
     * @return the bid model
     */
    @PutMapping("/{id}")
    public BidModel updateBid(@PathVariable("id") Long id, @RequestBody BidModel bidModel) {
        BidModel bidToUpdate = bidRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bid not found with id " + id));

        VendorModel vendor = vendorRepository.findById(bidModel.getVendor().getId())
                .orElseThrow(() -> new EntityNotFoundException("Vendor not found with id " + bidModel.getVendor().getId()));

        modelMapper.map(bidModel, bidToUpdate);
        bidToUpdate.setVendor(vendor);

        return bidRepository.save(bidToUpdate);
    }

    /**
     * Delete bid.
     *
     * @param id the id
     */
    @DeleteMapping("/{id}")
    public void deleteBid(@PathVariable("id") Long id) {
        bidService.deleteBid(id);
    }

    /**
     * Select winning bid bid model.
     *
     * @param bidId the bid id
     * @return the bid model
     */
    @PatchMapping("/{bidId}/select")
    public BidModel selectWinningBid(@PathVariable("bidId") Long bidId) {
        BidDTO selectedBidDTO = bidService.selectWinningBid(bidId);
        return modelMapper.map(selectedBidDTO, BidModel.class);
    }
}
