package com.example.pengadaanrsudsamrat.users;



import com.example.pengadaanrsudsamrat.UTIL.exception.ResourceNotFoundException;
import com.example.pengadaanrsudsamrat.users.DTO.OwnerRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.OwnerResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerServiceImpl implements OwnerService {
    private final OwnerRepository ownerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OwnerServiceImpl(OwnerRepository ownerRepository, ModelMapper modelMapper) {
        this.ownerRepository = ownerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public OwnerResponseDTO createOwner(OwnerRequestDTO ownerRequestDTO) {
        OwnerModel ownerModel = modelMapper.map(ownerRequestDTO, OwnerModel.class);
        ownerModel = ownerRepository.save(ownerModel);
        return modelMapper.map(ownerModel, OwnerResponseDTO.class);
    }

    @Override
    public OwnerResponseDTO getOwnerById(Long id) {
        OwnerModel ownerModel = ownerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id: " + id));
        return modelMapper.map(ownerModel, OwnerResponseDTO.class);
    }

    @Override
    public OwnerResponseDTO login(OwnerRequestDTO ownerRequestDTO) {
        Object object = ownerRepository.findByUsernameAndPassword(ownerRequestDTO.getUsername(), ownerRequestDTO.getPassword())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));

        if(object instanceof OwnerModel ownerModel) {
            return modelMapper.map(ownerModel, OwnerResponseDTO.class);
        } else {
            throw new ResourceNotFoundException("Invalid credentials");
        }
    }


}
