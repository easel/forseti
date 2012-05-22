/**
 * Created with IntelliJ IDEA.
 * User: erik
 * Date: 5/19/12
 * Time: 7:08 PM
 * To change this template use File | Settings | File Templates.
 */

// constants
var HASH_LENGTH = 8;


// includes
var fs = require('fs'),
    crypto = require('crypto'),
    path = require('path');

/**
 * Determine what dependencies are present in @file_content given a list of
 * possibilities in @all_file_paths
 *
 * @param file_content
 * @param all_file_paths
 */
function getDependencies(file_path, file_content, all_file_paths) {
    var i;
    all_file_paths.forEach(function(current_file_path) {
        if ( file_content.search(current_file_path) != -1) {
            console.log('yep');
        }

    });
}

/**
 * For each file in the directory, parse it looking for dependencies,
 * building up a graph to be used when ordering the output results
 *
 * @param root_path
 * @param all_file_paths
 */
function getAllDependencies(root_path, all_file_paths) {
    function getDependencies(file_path) {
        var file_obj = null,
            file_content = '';
        file_content = fs.readFileSync(file_path, 'utf-8');
        Object.keys(all_file_paths).forEach(function(file_path2) {
            file_obj = all_file_paths[file_path2];
            if (file_path.indexOf(file_path2) != -1) {
                // console.log('skipping self dependency - '
                // + file_path2 + ' is in ' + file_path);
            } else if (file_content.indexOf('/' + file_path2) != -1) {
                file_obj['dependencies'].push(file_path2);
            }
        });

    }

    Object.keys(all_file_paths).forEach(function(file_path) {
        getDependencies(path.join(root_path, file_path));
    })
}

/**
 * Conduct a depth-first tree traversal of the list of file paths,
 * computing file hashes and hashed file names, replacing internal references
 * with hashed references, and copying the results to the output location
 * with the uniquely hashed file name
 *
 * @param root_path
 * @param all_file_paths
 */
function freezeFiles(root_path, all_file_paths) {

}

/**
 * Replace internal file references with references to their hashed
 * equivalents
 *
 * @param file_path
 * @returns the short hash of the content
 */
function replaceReferences(in_file_path, out_file_path, replacements) {
    var file_content = fs.readFileSync(file_path);
    // replace with replacements
    // write to file
    // return hash
}

/**
 * Calculate the shortened hash of a given string.
 *
 * @param file_path
 */
function getShortHash(file_path) {
    var file_content = '',
        file_hash = '',
        short_file_hash = '';
    file_content = fs.readFileSync(file_path);
    file_hash = crypto.createHash('sha512').update(file_content).digest("hex");
    short_file_hash = file_hash.substr(0, HASH_LENGTH);
}

/**
 * Walk the file tree, starting at root path, building up an array of the
 * file names and statistics.
 *
 * @param root_path
 * @return {Object}
 */
function enumerateFiles(root_path) {
    var all_files = {};
    function recurse(parent_path) {
        var file_name = '',
            file_path = '',
            file_stats = '',
            relative_file_path = '';
        fs.readdirSync(parent_path).forEach(function(file_name) {
            file_path = path.join(parent_path, file_name);
            file_paths.push(file_path);
            file_stats = fs.statSync(file_path);
            if (file_stats.isFile()) {
                relative_file_path = file_path.substr(root_path.length + 1);
                all_files[relative_file_path] = {
                    dependencies: [],
                    file_path: file_path,
                    file_name: file_name,
                    relative_file_path: relative_file_path,
                    stats: file_stats
                };
            } else if (file_stats.isDirectory()) {
                recurse(file_path);
            }
        });
    }
    recurse(root_path);
    return all_files;
}

/**
 * "main"
 */
// parse arguments
var argv = require('optimist')
    .usage('Usage: $0 --source [source] --target [target]')
    .default('source', '.')
    .default('target', 'target')
    .argv;

// global variables
var files = {},
    file_paths = [],
    root_path = '';

root_path = argv['source'].replace(/\/+$/, "");

file_paths = enumerateFiles(root_path);
getAllDependencies(root_path, file_paths);
//console.log(JSON.stringify(file_paths));
//console.log(JSON.stringify(files));
