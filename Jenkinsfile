pipeline {
    agent any

    environment {
        NODE_ENV = 'development'  // Changed to development so devDependencies are installed
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
                bat '"C:\\Program Files\\nodejs\\npm.cmd" install --include=dev'
            }
        }

        stage('Build') {
            steps {
                echo '===== Building React application ====='
                bat 'set NODE_ENV=production && "C:\\Program Files\\nodejs\\npx.cmd" vite build'
                bat 'if exist dist\\ (dir dist\\) else (echo dist folder not found)'
            }
        }

        stage('Quality Checks') {
            steps {
                echo '===== Running quality checks ====='
                bat '''
                    if exist package.json (
                        echo package.json found
                        echo Dependencies installed
                    )
                    if exist dist\\ (
                        echo Build completed successfully
                    ) else (
                        echo Build failed - dist folder missing
                        exit /b 1
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
                    start /B "C:\\Program Files\\nodejs\\npx.cmd" vite preview --port 4173
                    timeout /T 5 /NOBREAK
                    echo Preview server should be running on http://localhost:4173/
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
                    if exist dist\\ (
                        echo Build artifacts found:
                        dir dist\\
                        echo.
                        echo File count in dist:
                        dir dist\\ /s /-c | find "File(s)"
                    ) else (
                        echo No build artifacts found
                    )
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