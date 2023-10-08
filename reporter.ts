import { Reporter } from '@playwright/test/reporter'
import * as fs from 'fs'

class TestReporter implements Reporter {
    onBegin(config, suite) {
        console.log(`Execution of ${suite.allTests().lenght} tests`)
    }

    onEnd(result) {
        console.log(`Execution finished with status of ${result.status}`)
    }

    onTestBegin(test) {
        console.log(`Execution of ${test.title} started.`)
    }

    onTestEnd(test, result) {
        const execTime = result.duration;

        const data = {
            test: test.title,
            status: result.status,
            executionTime: execTime,
            errors: result.errors,
        }

        const dataToString = JSON.stringify(data, null, 2)
        console.log(dataToString)

        fs.writeFileSync("test-results.json", dataToString)
    }
}

export default TestReporter;