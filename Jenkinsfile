pipeline {
    agent any

    environment {
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Instalar dependências') {
            steps {
                script {
                    // Instala as dependências do projeto
                    sh 'npm install'
                }
            }
        }

        stage('Executar testes') {
            steps {
                script {
                    // Executa os testes do projeto
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Pipeline finalizado.'
            }
        }
    }
}