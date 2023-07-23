package com.example.pengadaandataprocessing.Model

case class StatusChange(
                         orderId: Long,
                         vendorId: Long,
                         fromStatus: String,
                         toStatus: String,
                         durationInMillis: Long
                       )
