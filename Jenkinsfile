pipeline {
  agent any

  stages {
    stage('Build and Execute FrontendRSReact') {
      steps {
        dir('FrontendRSReact') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Build and Execute FrontendVendorVue') {
      steps {
        dir('FrontendVendorVue') {
          sh 'npm install'
          sh 'npm run build'
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
        sh 'scp -r FrontendRSReact/dist darkzill@36.93.137.4:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the Vue build files to the server using SCP
        sh 'scp -r FrontendVendorVue/dist darkzill@36.93.137.4:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the React build files to the server using SCP
        sh 'scp target/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar darkzill@36.93.137.4:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the Spring Boot JAR file to the server using SCP

        // Stop the Apache server

        sh 'ssh darkzill@36.93.137.4 "sudo rm -rf /home/rsudsamrat/Desktop/Sistem-pengadaan/dist/*"'  // Remove existing Vue and React app files
        sh 'ssh darkzill@36.93.137.4 "sudo rm -rf /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar"'  // Remove existing Spring Boot app file

        sh 'ssh darkzill@36.93.137.4 "sudo cp -r /home/rsudsamrat/Desktop/Sistem-pengadaan/dist /home/rsudsamrat/Desktop/Sistem-pengadaan"'  // Copy Vue and React app files to the deployment directory
        sh 'ssh darkzill@36.93.137.4 "sudo cp /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar /home/rsudsamrat/Desktop/Sistem-pengadaan"'  // Copy Spring Boot JAR file to the deployment directory

        sh 'ssh darkzill@36.93.137.4 "cd /home/rsudsamrat/Desktop/Sistem-pengadaan && npm install && npm start"'  // Install dependencies and start the Vue and React apps
        sh 'ssh darkzill@36.93.137.4 "java -jar /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar"'  // Execute the Spring Boot app
      }
    }
  }
}
