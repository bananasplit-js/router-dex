/**
 *
 *  Cli Table Generator
 *  @module ./lib/helpers/generateTable
 *
 *  @description generates a cli table
 *  @author diegoulloao
 *
 */
import Table from "cli-table3"
import chalk from "chalk"

// Types
import { Table as CliTable3 } from "cli-table3"

const generateTable = (): CliTable3 => {

  const table = new Table({
    head: [
      chalk.yellow.bold("\nmethod\n"),
      chalk.yellow.bold("\nroute\n"),
      chalk.yellow.bold("\nmiddlewares\n")
    ],

    style: {
      "padding-left": 3,
      "padding-right": 3
    },

    chars: {
      "top": chalk.yellow("─"),
      "top-mid": chalk.yellow("┬"),
      "top-left": chalk.yellow("┌"),
      "top-right": chalk.yellow("┐"),
      "bottom": chalk.yellow("─"),
      "bottom-mid": chalk.yellow("┴"), 
      "bottom-left": chalk.yellow("└"),
      "bottom-right": chalk.yellow("┘"),
      "left": chalk.yellow("│"),
      "left-mid": "",
      "mid": "",
      "mid-mid": "",
      "right": chalk.yellow("│"),
      "right-mid": "",
      "middle": chalk.yellow("│")
    }
  })

  return table

}

export default generateTable
