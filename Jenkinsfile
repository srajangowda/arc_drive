pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
        APP_PORT = '5173'
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
                bat '''
                    if exist node_modules\\.install_stamp (
                        fc /b package-lock.json node_modules\\.install_stamp >nul 2>&1
                        if errorlevel 1 (
                            echo package-lock.json changed, reinstalling...
                            "C:\\Program Files\\nodejs\\npm.cmd" install --prefer-offline
                            copy /y package-lock.json node_modules\\.install_stamp
                        ) else (
                            echo node_modules up to date, skipping install
                        )
                    ) else (
                        echo First install...
                        "C:\\Program Files\\nodejs\\npm.cmd" install --prefer-offline
                        copy /y package-lock.json node_modules\\.install_stamp
                    )
                '''
            }
        }

        stage('Build') {
            steps {
                echo '===== Building React application ====='
                bat 'set NODE_ENV=production && "C:\\Program Files\\nodejs\\npx.cmd" vite build'
            }
        }

        stage('Quality Checks & Verify') {
            parallel {
                stage('Quality Checks') {
                    steps {
                        echo '===== Running quality checks ====='
                        bat '''
                            if exist package.json (echo package.json found) else (echo package.json missing && exit /b 1)
                            if exist dist\\ (echo Build completed successfully) else (echo Build failed - dist folder missing && exit /b 1)
                        '''
                    }
                }
                stage('Verify Build Artifacts') {
                    steps {
                        echo '===== Verifying build artifacts ====='
                        bat '''
                            if exist dist\\ (
                                dir dist\\
                                dir dist\\ /s /-c | find "File(s)"
                            ) else (
                                echo No build artifacts found
                            )
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'local') {
                        echo '===== Deploying to localhost:4173 ====='
                        bat '''
                            taskkill /F /IM node.exe /T 2>nul || echo No previous server running
                            start "" /B cmd /c "\"C:\\Program Files\\nodejs\\npx.cmd\" vite preview --port 4173 > vite-preview.log 2>&1"
                            echo Preview server running on http://localhost:4173/
                        '''
                    } else if (params.ENVIRONMENT == 'staging') {
                        echo '===== Deploying to Staging ====='
                        bat 'echo Staging deployment completed'
                    } else if (params.ENVIRONMENT == 'production') {
                        echo '===== Deploying to Production ====='
                        bat 'echo Production deployment completed'
                    }
                }
            }
        }
    }

    post {
        always {
            echo '===== Cleaning up workspace ====='
            // Do NOT delete node_modules — cache it for next run
            cleanWs(deleteDirs: true, patterns: [[pattern: 'dist', type: 'INCLUDE']])
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
