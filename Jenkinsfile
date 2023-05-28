pipeline {
  agent any

  stages {
   stage('Build and Execute FrontendRSReact') {
  steps {
    dir('FrontendRSReact') {
      sh 'npm install'  // Use the correct path to the npm executable
       // Use the correct path to the npm executable
    }
  }
}

stage('Build and Execute FrontendVendorVue') {
  steps {
    dir('FrontendVendorVue') {
      sh 'npm install'  // Use the correct path to the npm executable
       // Use the correct path to the npm executable
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
        sh 'scp -r FrontendRSReact/dist darkzill0410@10.110.34.59:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the Vue build files to the server using SCP
        sh 'scp -r FrontendVendorVue/dist darkzill0410@10.110.34.59:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the React build files to the server using SCP
        sh 'scp target/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar darkzill0410@10.110.34.59:/home/rsudsamrat/Desktop/Sistem-pengadaan'  // Copy the Spring Boot JAR file to the server using SCP

        sh 'ssh darkzill0410@10.110.34.59 "sudo systemctl stop apache2"'  // Stop the Apache server

        sh 'ssh darkzill0410@10.110.34.59 "sudo rm -rf /home/rsudsamrat/Desktop/Sistem-pengadaan/dist/*"'  // Remove existing Vue and React app files
        sh 'ssh darkzill0410@10.110.34.59 "sudo rm -rf /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar"'  // Remove existing Spring Boot app file

        sh 'ssh darkzill0410@10.110.34.59 "sudo cp -r /home/rsudsamrat/Desktop/Sistem-pengadaan/dist /home/rsudsamrat/Desktop/Sistem-pengadaan"'  // Copy Vue and React app files to the deployment directory
        sh 'ssh darkzill0410@10.110.34.59 "sudo cp /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar /home/rsudsamrat/Desktop/Sistem-pengadaan"'  // Copy Spring Boot JAR file to the deployment directory

        sh 'ssh darkzill0410@10.110.34.59 "cd /home/rsudsamrat/Desktop/Sistem-pengadaan && npm install && npm start"'  // Install dependencies and start the Vue and React apps
        sh 'ssh darkzill0410@10.110.34.59 "java -jar /home/rsudsamrat/Desktop/Sistem-pengadaan/PengadaanRSUDSamrat-0.0.1-SNAPSHOT.jar"'  // Execute the Spring Boot app
      }
    }
  }
}
