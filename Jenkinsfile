node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner-JK';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/SonarScanner-JK"
    }
  }
}
