package com.example.pengadaandataprocessing.Controller.Util

import com.example.pengadaandataprocessing.Model.StatusChange
import com.opencsv.CSVReaderBuilder
import org.springframework.web.multipart.MultipartFile

import java.io.InputStreamReader
import java.nio.charset.StandardCharsets
import scala.jdk.CollectionConverters.CollectionHasAsScala

object CsvReaderUtil {

  def readCsvAndConvertToStatusChangeList(file: MultipartFile): List[StatusChange] = {
    val reader = new InputStreamReader(file.getInputStream, StandardCharsets.UTF_8)
    val csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build() // Skip header row
    val rows = csvReader.readAll().asScala.toList

    // Convert CSV rows to StatusChange objects
    rows.flatMap(row => {
      // Assuming the CSV columns are in the order: orderId, vendorId, fromStatus, toStatus, durationInMillis
      try {
        val orderId = row(0).toLong
        val vendorId = row(10).toLong // Assuming vendorId is in the 11th column
        val fromStatus = row(7)
        val toStatus = row(9)
        val durationInMillis = row(6).toLong

        // Data cleaning and validation: Ensure orderId and vendorId are positive numbers
        if (orderId > 0 && vendorId > 0) {
          Some(StatusChange(orderId, vendorId, fromStatus, toStatus, durationInMillis))
        } else {
          None
        }
      } catch {
        // If any conversion fails or data is invalid, skip the row
        case _: NumberFormatException | _: IndexOutOfBoundsException => None
      }
    })
  }
}
