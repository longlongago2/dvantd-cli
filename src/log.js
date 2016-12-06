import leftPad from 'left-pad'; // 截取并组合指定位数的字符，返回一个新的字符串 leftPad('foobar', 3) => "foo"
import chalk from 'chalk';      // 改变 Terminal 打印颜色的库

export function info(type, message) {
    console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

export function error(message) {
    console.error(chalk.red(message));
}

export function success(message) {
    console.error(chalk.green(message));
}