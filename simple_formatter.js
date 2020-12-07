const {getGherkinScenarioLocationMap, getGherkinScenarioMap, getGherkinStepMap} = require('@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser');
const {getPickleStepMap, getStepKeyword} = require('@cucumber/cucumber/lib/formatter/helpers/pickle_parser');
const { doesHaveValue } = require('@cucumber/cucumber/lib/value_checker');

const { Formatter, formatterHelpers, Status } = require('@cucumber/cucumber')
const { cross, tick } = require('figures');
const Table = require('cli-table3');
const colors = require('colors');
const { EOL: n } = require('os');

/**
 * @typedef {Object} Options
 * @property colorFns - a series of helper functions for outputting colors
 * @property colorsEnabled
 * @property cwd - the current working directory
 * @property {EventEmitter} eventBroadcaster - an event emitter that emits the event protocol
 * @property {EventDataCollector} eventDataCollector - an instance of EventDataCollector which handles the complexity of grouping the data for related events
 * @property log - function which will write the passed string to the the designated stream
 * @property snippetBuilder - an object with a build method that should be called with {keywordType, pickleStep}
 * @property stream - the underlying stream the formatter is writing to
 * @property supportCodeLibrary
 * @see https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
 */

/** @see https://github.com/cucumber/cucumber-js/blob/master/src/formatter/helpers/issue_helpers.js */
const marks = {
    ambiguous: cross,
    failed: cross,
    passed: tick,
    pending: '?',
    skipped: '-',
    undefined: '?'
};

/** @see https://github.com/cli-table/cli-table3#custom-styles */
const table = {
    chars: {
        top: '', 'top-left': '', 'top-mid': '', 'top-right': '',
        mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '',
        bottom: '', 'bottom-left': '', 'bottom-mid': '', 'bottom-right': ''
    },
    style: {
        head: [],
        border: []
    }
};


class SimpleFormatter extends Formatter {
    /** @param {Options} options */
    constructor(options) {
        super(options)
        this.colorsEnabled = options.colorsEnabled;
        this.descriptionEnabled = options.descriptionEnabled;

        options.eventBroadcaster.on('envelope', (envelope) => {
            if (envelope.testCaseStarted) {
                const { gherkinDocument, pickle } = options.eventDataCollector.getTestCaseAttempt(envelope.testCaseStarted.id);

                if (this.uri !== gherkinDocument.uri) {
                    const { feature } = gherkinDocument;

                    if (this.uri) this.logn();

                    const tags = feature.tags.map((tag) => tag.name).join(' ');
                    if (tags) this.logn(options.colorFns.tag(tags));

                    this.logn(`${this.color(feature.keyword, 'magenta', 'bold')}: ${feature.name}`);

                    if (feature.description && this.descriptionEnabled) this.logn(`${n}${feature.description}`);

                    this.uri = gherkinDocument.uri;
                }

                this.logn();

                const tags = pickle.tags.map((tag) => tag.name).join(' ');
                if (tags) this.logn(options.colorFns.tag(tags), 2);


                const gherkinScenarioMap = getGherkinScenarioMap(gherkinDocument);
                const keyword = gherkinScenarioMap[pickle.astNodeIds[0]].keyword;

                this.logn(`${this.color(keyword, 'magenta', 'bold')}: ${pickle.name}`, 2);
            } else if (envelope.testStepStarted) {
                const { gherkinDocument, pickle, testCase } = options.eventDataCollector.getTestCaseAttempt(envelope.testStepStarted.testCaseStartedId);

                const pickleStepMap = getPickleStepMap(pickle);
                const gherkinStepMap = getGherkinStepMap(gherkinDocument);
                const testCaseStartedId = envelope.testStepStarted.testCaseStartedId;
                const testStepId = envelope.testStepStarted.testStepId;
                const testStep = testCase.testSteps.find(item => item.id === testStepId);

                if (testStep.pickleStepId !== ''){
                    const pickleStep = pickleStepMap[testStep.pickleStepId];
                    const astNodeId = pickleStep.astNodeIds[0];
                    const gherkinStep = gherkinStepMap[astNodeId];
                    this.logn(`${this.color(gherkinStep.keyword.trim(), 'bold')} ${gherkinStep.text}`, 4);
                }

                // DATA TABLES
                // testStep.arguments.forEach((argument) => {
                //     if (argument.content) {
                //         this.logn(`"""${n}${argument.content}${n}"""`, 6);
                //     }
                //
                //     if (argument.rows) {
                //         const datatable = new Table(table);
                //         datatable.push(...argument.rows);
                //         this.logn(datatable, 6);
                //     }
                // });
            } else if (envelope.testStepFinished) {
                const { message, status } = envelope.testStepFinished.testStepResult;

                const statusName = Status[status].toLowerCase();
                if (statusName !== 'passed') {
                   this.logn(options.colorFns[status](`${marks[statusName]} ${statusName}`), 4);
                }

                if (doesHaveValue(message)) {
                   //const error = formatterHelpers.formatError(exception, options.colorFns);
                   this.logn(message, 6);
                }
            } else if (envelope.testRunFinished) {
                //    const noptions = Object.create(options, { eventBroadcaster: { value: { on: () => { } } } });
                //    const formatter = new SummaryFormatter(noptions);
                //    if (this.uri) this.logn();
                //    formatter.logSummary(event);
            }
        })
    }

    logprops(obj, name) {

        this.logn("-----------------")
        if (name) {
            this.logn(`Properties of ${name}`)
        }

        for(var propertyName in obj) {
            this.logn(`${propertyName} = ${obj[propertyName]}`);
        }

        this.logn("-----------------")
    }

    logpropprops(obj, name) {

        this.logn("***************")
        if (name) {
            this.logn(`*** START: Properties of ${name}`)
        }

        for(var propertyName in obj) {
            this.logprops(obj[propertyName], `${propertyName}`);
        }

        if (name) {
            this.logn(`*** END: Properties of ${name}`)
        }
        this.logn("***************")
    }

    //logTestCaseFinished(testCaseFinished) {
    //    const testCaseAttempt = this.eventDataCollector.getTestCaseAttempt(testCaseFinished.testCaseStartedId)
    //    this.log(testCaseAttempt.gherkinDocument.feature.name + ' / ' + testCaseAttempt.pickle.name + '\n')
    //    const parsed = formatterHelpers.parseTestCaseAttempt({
    //        cwd: this.cwd,
    //        snippetBuilder: this.snippetBuilder,
    //        supportCodeLibrary: this.supportCodeLibrary,
    //        testCaseAttempt
    //    })
    //    parsed.testSteps.forEach(testStep => {
    //        this.log('  ' + testStep.keyword + (testStep.text || '') + ' - ' + Status[testStep.result.status] + '\n')
    //    })
    //    this.log('\n')
    //}
    //
    //logTestRunFinished(testRunFinished) {
    //    this.log(testRunFinished.success ? 'SUCCESS' : 'FAILURE')
    //}


    color(value, ...color) {
        return this.colorsEnabled ? color.reduce((v, c) => v[c], colors)(value) : value;
    }

    logn(value = '', indent = 0) {
        let text = value.toString();
        if (indent > 0) text = text.replace(/^/gm, ' '.repeat(indent));
        this.log(`${text}${n}`);
    }
}

module.exports = SimpleFormatter
