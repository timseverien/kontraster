#! /usr/local/bin/node

const meow = require('meow');
const audit = require('./lib/audit');

const helpMessage = `
Usage
  $ kontraster <base image> <overlay image> [options]

Options
  -h, --help         This help message
  --is-large-text    Whether the contents is large text (> 18 points, or > 14 points and bold)
  -l, --level        The WCAG level to test ("AA" or "AAA", defaults to AA)
  -o, --output       The path to write the output image to
  -t, --output-type  The type of output ("composition" or "mask", defaults to composition)

Examples
  $ kontraster "~/base.png" "~/with-text.png"
  $ kontraster "~/base.png" "~/with-text.png" --is-large-text
  $ kontraster "~/base.png" "~/with-text.png" --level AAA
  $ kontraster "~/base.png" "~/with-text.png" --output-type mask
`;

const cli = meow(helpMessage, {
	alias: {
		h: 'help',
		l: 'level',
		o: 'output',
		t: 'outputType',
	},
	boolean: ['help', 'isLargeText'],
	string: ['level', 'output', 'outputType'],
	default: {
		isLargeText: false,
		level: 'AA',
		output: './color-contrast.png',
		outputType: 'composition',
	},
});

if (cli.input.length !== 2) {
	console.error('Please specifiy two images');

	cli.showHelp();
	process.exit(1);
}

const auditOptions = {
	isLargeText: cli.flags.isLargeText,
	level: cli.flags.level,
	output: cli.flags.output,
	outputType: cli.flags.outputType,
};

audit(cli.input[0], cli.input[1], auditOptions)
	.then(console.log)
	.catch((err) => {
		console.error(err);
		cli.showHelp();
		process.exit(1);
	});

module.exports = cli;