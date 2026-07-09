pipeline{
    agent any
    
    parameters {
        choice(name: 'TAGS', choices: ['@smoke','@critical','@validLogin','@multipleInvalidLogin'], description: 'Select sceanrios to run')
    }
    tools{
        nodejs "Node26"
    }
    
    stages{
        stage('Checkout code'){
            steps{
                git branch: 'main',
                    url: "https://github.com/MohammedAbdul20/SauceDemo_Cucumber.git"
            }
        }
        
        // stage('Clean old results') {
        //     steps {
        //         bat 'if exist allure-results rmdir /s /q allure-results'
        //         bat 'if exist reports rmdir /s /q reports'
        //     }
        // }
        
        stage("Install Dependencies"){
            steps{
                bat 'npm install'
                bat 'npx playwright install'
            }
        }
        
        stage("run-tests"){
            steps{
                bat "npm run test -- --tags \"${params.TAGS}\" || exit 0"
            }
        }
        
        stage('Publish Report') {
            steps {
                cucumber buildStatus: 'UNSTABLE',
                         fileIncludePattern: 'reports/cucumber-report.json',
                         sortingMethod: 'ALPHABETICAL'
            }
        }
        
        stage('Allure Report') {
            steps {
                    allure includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
            }
        }
    }
}