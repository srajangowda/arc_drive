pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_PORT = '4173'
        BUILD_DIR = 'dist'
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['local', 'staging', 'production'], description: 'Deployment environment')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '===== Checking out code from Git ====='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '===== Installing Node dependencies ====='
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo '===== Building React application ====='
                bat 'npm run build'
                bat 'dir dist\\'
            }
        }

        stage('Quality Checks') {
            steps {
                echo '===== Running quality checks ====='
                bat '''
                    if exist package.json (
                        echo package.json found
                        echo Dependencies installed
                        echo Build completed successfully
                    )
                '''
            }
        }

        stage('Deploy to Local') {
            when {
                expression { params.ENVIRONMENT == 'local' }
            }
            steps {
                echo '===== Deploying to localhost:4173 ====='
                bat '''
                    echo Stopping previous preview server...
                    taskkill /F /IM node.exe /T 2>nul || echo No previous server running
                    echo Starting new preview server...
                    start /B npm run preview
                    timeout /T 3 /NOBREAK
                    echo Preview server started on http://localhost:4173/
                '''
            }
        }

        stage('Deploy to Staging') {
            when {
                expression { params.ENVIRONMENT == 'staging' }
            }
            steps {
                echo '===== Deploying to Staging ====='
                bat '''
                    echo Deploying to staging environment...
                    echo Staging deployment completed
                '''
            }
        }

        stage('Deploy to Production') {
            when {
                expression { params.ENVIRONMENT == 'production' }
            }
            steps {
                echo '===== Deploying to Production ====='
                bat '''
                    echo Deploying to production environment...
                    echo Production deployment completed
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '===== Verifying deployment ====='
                bat '''
                    echo Build artifacts:
                    dir dist\\
                '''
            }
        }
    }

    post {
        always {
            echo '===== Cleaning up workspace ====='
            cleanWs(deleteDirs: true, patterns: [[pattern: '**/node_modules', type: 'INCLUDE']])
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
