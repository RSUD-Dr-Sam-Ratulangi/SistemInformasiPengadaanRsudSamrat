package com.example.pengadaandataprocessing.Model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "qualityRate")
case class QualityRate(
                        @Id id: String,
                        vendorId: Long,
                        orderId: Long,
                        statusChanges: List[StatusChange],
                        qualityRate: Double
                      )
