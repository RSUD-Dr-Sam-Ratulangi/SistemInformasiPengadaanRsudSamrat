pipeline {
  agent any

  stages {
    stage('Build and Execute FrontendRSReact') {
      steps {
        dir('FrontendRSReact') {
          sh 'npm install'  // Use the correct path to the npm executable
        }
      }
    }

    stage('Build and Execute FrontendVendorVue') {
      steps {
        dir('FrontendVendorVue') {
          sh 'npm install'  // Use the correct path to the npm executable
        }
      }
    }

    stage('Build and Execute Spring Boot App') {
      steps {

        sh 'mvn clean package -f pom.xml'
      }
    }

    stage('Deploy to Server') {
      steps {
        sh 'scp -r -i /home/key3 FrontendRSReact darkzill0410@36.93.137.4:/home/darkzill0410/Sistem-pengadaan'  // Copy the entire FrontendRSReact directory to the server using SCP
        sh 'scp -r -i /home/key3 FrontendVendorVue darkzill0410@36.93.137.4:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the entire FrontendVendorVue directory to the server using SCP

        sh 'ssh -i /home/key3 darkzill0410@36.93.137.4 "cd /home/rsudsamrat/Desktop/Sistem-pengadaan/FrontendRSReact && npm install && npm start"'  // Install dependencies and start the FrontendRSReact app
        sh 'ssh -i /home/key3 darkzill0410@36.93.137.4 "cd /home/rsudsamrat/Desktop/Sistem-pengadaan/FrontendVendorVue && npm install && npm start"'  // Install dependencies and start the FrontendVendorVue app

        sh 'scp -i /home/key3 target/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar darkzill0410@36.93.137.4:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the Spring Boot JAR file to the server using SCP


        sh 'ssh -i /home/key3 darkzill0410@36.93.137.4 "sudo rm -rf /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar"'  // Remove existing Spring Boot app file


        sh 'ssh -i /home/key3 darkzill0410@36.93.137.4 "java -jar /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar"'  // Execute the Spring Boot app
      }
    }
  }
}
