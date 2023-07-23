package com.example.pengadaandataprocessing.Service



import com.example.pengadaandataprocessing.Model.{QualityRate, StatusChange}

trait QualityRateService {
  def calculateAndSaveQualityRate(orderStatusData: List[StatusChange]): Unit
  def getTopVendors(numVendors: Int): List[QualityRate];
}
