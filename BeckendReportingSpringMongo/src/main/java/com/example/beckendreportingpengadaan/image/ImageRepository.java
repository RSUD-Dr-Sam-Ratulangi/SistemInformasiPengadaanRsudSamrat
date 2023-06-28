package com.example.beckendreportingpengadaan.image;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ImageRepository extends MongoRepository<ImageModel, String> {

    List<ImageModel> findByProductUuid(String productUuid);

}
