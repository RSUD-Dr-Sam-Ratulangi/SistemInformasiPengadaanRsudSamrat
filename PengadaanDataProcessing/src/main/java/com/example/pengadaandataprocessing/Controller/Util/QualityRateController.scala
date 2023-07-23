// QualityRateController.scala
package com.example.pengadaandataprocessing.Controller.Util

import com.example.pengadaandataprocessing.Model.{QualityRate, StatusChange}
import com.example.pengadaandataprocessing.Service.QualityRateService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation.{GetMapping, PostMapping, RequestMapping, RequestParam, RestController}
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping(Array("/api"))
class QualityRateController @Autowired()(qualityRateService: QualityRateService) {

  @PostMapping(Array("/upload-csv"))
  def uploadCSVFile(@RequestParam("file") file: MultipartFile): ResponseEntity[String] = {
    // Check if the file is not empty and is of CSV format
    if (file.isEmpty || !file.getContentType.equalsIgnoreCase("text/csv")) {
      return new ResponseEntity[String]("Invalid file. Please upload a CSV file.", HttpStatus.BAD_REQUEST)
    }

    try {
      // Read the CSV file and convert it to a list of StatusChange objects
      val orderStatusData: List[StatusChange] = CsvReaderUtil.readCsvAndConvertToStatusChangeList(file)

      // Calculate and save the quality rates to MongoDB
      qualityRateService.calculateAndSaveQualityRate(orderStatusData)

      new ResponseEntity[String]("File uploaded and quality rates calculated successfully.", HttpStatus.OK)
    } catch {
      case e: Exception =>
        new ResponseEntity[String](s"Error occurred: ${e.getMessage}", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @GetMapping(Array("/top-vendors"))
  def getTopVendors(@RequestParam("numVendors") numVendors: Int): ResponseEntity[List[QualityRate]] = {
    try {
      // Fetch the top N vendors based on their quality rates
      val topVendors = qualityRateService.getTopVendors(numVendors)
      new ResponseEntity[List[QualityRate]](topVendors, HttpStatus.OK)
    } catch {
      case e: Exception =>
        val errorMessage = s"Error occurred: ${e.getMessage}"
        new ResponseEntity[List[QualityRate]](HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }





}
