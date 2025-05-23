pipeline {
    agent any

    parameters {
        choice(
            name: 'BRANCH',
            choices: ['master', 'tryBranch', 'remoteChanges'],
            description: 'Selecciona la rama a construir'
        )
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: '¿Ejecutar pruebas?')
    }

    environment {
        DEPLOY_ENV = (params.BRANCH == 'master') ? 'production' : 'staging'
    }

    stages {
        stage('Validar Rama') {
            steps {
                script {
                    if (!['master', 'tryBranch', 'remoteChanges'].contains(params.BRANCH)) {
                        error "Rama no permitida: ${params.BRANCH}"
                    }
                    echo "✅ Rama seleccionada: ${params.BRANCH}"
                }
            }
        }
        stage('Checkout') {
            steps {
                echo "🔄 Haciendo checkout de la rama ${params.BRANCH}"
                checkout scm: [$class: 'GitSCM', branches: [[name: "*/${params.BRANCH}"]], userRemoteConfigs: scm.userRemoteConfigs]
            }
        }
        stage('Install') {
            steps {
                echo '📦 Instalando dependencias...'
                sh 'npm install'
            }
        }
        stage('Test') {
            when {
                expression { params.RUN_TESTS }
            }
            steps {
                echo '🧪 Ejecutando pruebas...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo "🚀 Simulando despliegue a ${env.DEPLOY_ENV}..."
                sh 'sleep 2'
                echo '🎉 Despliegue simulado completado'
            }
        }
    }
    post {
        success {
            echo '✅ ¡Pipeline completado con éxito!'
        }
        failure {
            echo '❌ Hubo un error en el pipeline'
        }
    }
}
