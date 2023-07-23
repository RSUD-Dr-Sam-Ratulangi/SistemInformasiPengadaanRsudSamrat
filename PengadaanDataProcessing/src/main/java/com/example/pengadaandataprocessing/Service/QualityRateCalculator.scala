package com.example.pengadaandataprocessing.Service

// com.example.pengadaandataprocessing.Service.QualityRateCalculator.scala
import com.example.pengadaandataprocessing.Model.{QualityRate, StatusChange}
import org.springframework.stereotype.Component

@Component
class QualityRateCalculator {

  def calculateQualityRate(statusChanges: List[StatusChange]): List[QualityRate] = {
    // Convert StatusChange objects to QualityRate objects
    val qualityRates = convertStatusChangeToQualityRate(statusChanges)

    // Calculate quality rate for each order and vendor
    val calculatedQualityRates: List[QualityRate] = qualityRates.map(qualityRate => {
      val averageDuration = calculateAverageDuration(qualityRate.statusChanges)
      qualityRate.copy(qualityRate = averageDuration)
    })

    calculatedQualityRates
  }

  private def convertStatusChangeToQualityRate(statusChanges: List[StatusChange]): List[QualityRate] = {
    // Implement the logic to convert StatusChange objects to QualityRate objects
    statusChanges.map(statusChange => {
      QualityRate(
        id = s"${statusChange.vendorId}_${statusChange.orderId}",
        vendorId = statusChange.vendorId,
        orderId = statusChange.orderId,
        statusChanges = List(statusChange),
        qualityRate = 0.0 // You may initialize this to 0 or any default value
      )
    })
  }

  private def calculateAverageDuration(statusChanges: List[StatusChange]): Double = {
    // Calculate the average duration between status changes for a specific order and vendor
    if (statusChanges.isEmpty) {
      0.0 // Return 0 if there are no status changes for the order and vendor
    } else {
      val totalDuration = statusChanges.map(_.durationInMillis).sum
      totalDuration.toDouble / statusChanges.length.toDouble
    }
  }
}
