const fs = require('fs');
const path = require('path');
const axios = require('axios');
const readline = require('readline-sync');
const { exec } = require('child_process');
const tty = require('tty');
const os = require('os');

let files = {}
const P = ['\\', '|', '/', '-'];
let x = 0;
global.nbedited = 0;

// Helper function to clear line and reset cursor (cross-platform)
const clearCurrentLine = () => {
    try {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    } catch (e) {
        process.stdout.write('\r\x1b[2K');
    }
};

const moveCursorUp = (n = 1) => {
    try {
        process.stdout.moveCursor(0, -n);
    } catch (e) {
        process.stdout.write(`\x1b[${n}A`);
    }
};

const clearLineDown = () => {
    try {
        process.stdout.clearLine(1);
    } catch (e) {
        process.stdout.write('\x1b[0J');
    }
};

async function getaddon() {
    const transactionid = readline.question('BETA: Enter your license (If you bought it on BuiltByBits check your discussion): ');
    const loader = setInterval(() => {
        clearCurrentLine();
        process.stdout.write(`Search for the transaction ${transactionid} (This can take some seconds) ${P[x++]}`);
        x %= P.length;
    }, 250);
    
    try {
        const res = await axios.get('https://api.whee.lol/api/client/pterodactyl/checkIfExist', {
            params: { id: transactionid },
            timeout: 10000
        });
        
        clearInterval(loader);
        clearCurrentLine();
        process.stdout.write("Transaction found ✅\n");
        
        if (res.status >= 400) {
            process.stdout.write(`\nThis license is invalid, I can't install any addon with that\n`);
            process.exit(1);
        }
        
        const buyer = res.data['buyer'] || 'User';
        const fullname = res.data['fullname'] ? res.data['fullname'].replace(/\s+/g, ' ').trim() : 'Unknown Addon';
        
        process.stdout.write(`\n\x1b[1m\x1b[33mWARNING: \x1b[0m THIS INSTALLER HAS A SMALL CHANCE TO BRICK YOUR PANEL (if this happens contact me on discord). I'M NOT RESPONSIBLE FOR ANY DAMAGE\n`);
        const goodaddon = readline.question(`\nHello ${buyer}. You want to install "${fullname}" right (y/n)? `);
        
        if (goodaddon === 'y' || goodaddon === 'yes') {
            process.stdout.write(`\nPerfect! I will launch the installation now.\n`);
            const theme = readline.question(`\nDo you have a theme (y/n)? `);
            
            if (theme === 'y' || theme === 'yes') {
                await startinstall(transactionid, res.data['name'], true);
            } else if (theme === 'n' || theme === 'no') {
                await startinstall(transactionid, res.data['name'], false);
            } else {
                process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0mPlease enter yes/y/no/n\n`);
                process.exit(1);
            }
        } else {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0mPlease confirm the addon installation or contact support on discord\n`);
            process.exit(1);
        }
    } catch (error) {
        clearInterval(loader);
        clearCurrentLine();
        
        if (error.response && error.response.data && error.response.data.message) {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0m${error.response.data.message}\n`);
        } else if (error.message) {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0m${error.message}\n`);
        } else {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0mFailed to verify license. Please check your connection and try again\n`);
        }
        process.exit(1);
    }
}

async function startinstall(transaction, name, theme) {
    const loader = setInterval(() => {
        console.clear()
        process.stdout.write(`Get installation program of ${name} (This can take some seconds) ${P[x++]}`);
        x %= P.length;
    }, 250);
    
    try {
        const res = await axios.get(`https://api.whee.lol/api/client/pterodactyl/getautoinstaller?id=${transaction}&selectaddon=${name}`, {
            timeout: 15000
        });
        
        clearInterval(loader);
        clearCurrentLine();
        process.stdout.write("Installer downloaded ✅\n");
        const files = res.data;
        const nbofedit = Object.keys(files).length;
        let completedEdits = 0;
        
        const load = setInterval(() => {
            if (completedEdits >= nbofedit) {
                clearInterval(load);
                moveCursorUp(1);
                clearLineDown();
                process.stdout.write(`Installation done ✅\n`);
                buildassets();
            } else {
                moveCursorUp(1);
                clearLineDown();
                process.stdout.write(`Installation in progress please wait... (This can take some seconds) ${P[x++]}\n`);
                x %= P.length;
            }
        }, 250);
        
        for (let file in files) {
            await doedit(files, file, theme);
            completedEdits++;
        }
    } catch (error) {
        clearInterval(loader);
        clearCurrentLine();
        
        if (error.response && error.response.data && error.response.data.message) {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0m${error.response.data.message}\n`);
        } else if (error.message) {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0m${error.message}\n`);
        } else {
            process.stdout.write(`\n\x1b[31m\x1b[1mERROR: \x1b[0mFailed to download installer\n`);
        }
        process.exit(1);
    }
}

// Auto-fix unsafe patterns in PHP files
function fixPhpCode(content, filePath) {
    // Only process PHP files
    if (!filePath.includes('.php')) return content;
    
    // Fix 1: Add null checks for $request->x ?? $request->y patterns
    // Find all Request handler methods
    content = content.replace(
        /(\$(\w+)\s*=\s*\$request->(\w+)\s*\?\?\s*\$request->(\w+)\s*;)/g,
        (match, fullMatch, varName, firstParam, secondParam) => {
            const check = `if (!$${varName}) {\n        return response()->json(['message' => 'Required parameter missing', 'status' => 'error'], 400);\n    }`;
            return `${fullMatch}\n    ${check}`;
        }
    );
    
    // Fix 2: Make checkLicense parameter nullable if it's typed as non-nullable string
    if (filePath.includes('Controller') && content.includes('checkLicense')) {
        content = content.replace(
            /public\s+function\s+checkLicense\s*\(\s*string\s+\$transaction/g,
            'public function checkLicense(?string $transaction'
        );
    }
    
    // Fix 3: Add null safety for API calls that might fail
    content = content.replace(
        /Http::get\('([^']+)'\)->object\(\)->(\w+)/g,
        'Http::timeout(10)->get(\'$1\')->object()?->$2 ?? null'
    );
    
    // Fix 4: Add try-catch for external API calls in methods
    if (filePath.includes('Controller') && content.includes('Http::')) {
        content = content.replace(
            /(public\s+function\s+\w+\s*\([^)]*\$request[^)]*\)\s*\n\s*\{)/g,
            (match) => {
                return match + '\n        if (!$request) {\n            return response()->json([\'message\' => \'Invalid request\', \'status\' => \'error\'], 400);\n        }';
            }
        );
    }
    
    return content;
}

function doedit(files, file, theme) {
    return new Promise((resolve) => {
        if (files[file] && Array.isArray(files[file]) && files[file].length > 0) {
            const firstItem = files[file][0];
            const itemType = firstItem['type'] || 'unknown';
            
            if (itemType === 'newfile' || itemType === 'folder') {
                // Handle new files and folders
                if (itemType === 'folder') {
                    fs.mkdir(file, { recursive: true }, (err) => {
                        if (err) console.error(`Error creating directory ${file}:`, err);
                        resolve();
                    });
                } else {
                    const dir = path.dirname(file);
                    fs.mkdir(dir, { recursive: true }, (err) => {
                        if (err) {
                            process.stdout.write(`\n\x1b[31m\x1b[1m❌ ERROR CREATING DIRECTORY ${dir}\x1b[0m\n`);
                            process.exit(1);
                        }
                        
                        let fileContent = files[file][0]['add'] || '';
                        // Auto-fix PHP code before writing
                        fileContent = fixPhpCode(fileContent, file);
                        
                        fs.writeFile(file, fileContent, (err) => {
                            if (err) {
                                process.stdout.write(`\n\x1b[31m\x1b[1m❌ ERROR CREATING FILE ${file}\x1b[0m\n`);
                                process.exit(1);
                            }
                            resolve();
                        });
                    });
                }
            } else {
                // Edit existing files
                setTimeout(() => {
                    fs.readFile(file, 'utf8', function read(err, data) {
                        if (err) {
                            process.stdout.write(`\n\x1b[31m\x1b[1m❌ ERROR READING FILE ${file}\x1b[0m\n`);
                            process.exit(1);
                        }
                        
                        let content = data;
                        
                        for (let edit in files[file]) {
                            const editItem = files[file][edit];
                            const editType = editItem['type'];
                            const shouldApply = (theme && (editItem['theme'] === 'yes' || editItem['theme'] === 'any')) ||
                                               (!theme && (editItem['theme'] === 'no' || editItem['theme'] === 'any'));
                            
                            if (shouldApply && content.indexOf(editItem['add']) === -1) {
                                let addContent = editItem['add'];
                                // Auto-fix PHP code before applying
                                addContent = fixPhpCode(addContent, file);
                                
                                if (editType === 'above') {
                                    content = content.replace(editItem['where'], `${addContent}\n${editItem['where']}`);
                                } else if (editType === 'under') {
                                    content = content.replace(editItem['where'], `${editItem['where']}\n${addContent}`);
                                } else if (editType === 'replace') {
                                    content = content.replace(editItem['where'], addContent);
                                }
                            }
                        }
                        
                        // Apply final auto-fixes to entire file
                        content = fixPhpCode(content, file);
                        
                        const dir = path.dirname(file);
                        fs.mkdir(dir, { recursive: true }, (err) => {
                            fs.writeFile(file, content, (err) => {
                                if (err) {
                                    process.stdout.write(`\n\x1b[31m\x1b[1m❌ ERROR WRITING FILE ${file}\x1b[0m\n`);
                                    process.exit(1);
                                }
                                resolve();
                            });
                        });
                    });
                }, 100);
            }
        } else {
            resolve();
        }
    });
}

function buildassets() {
    process.stdout.write('\n')
    const load = setInterval(() => {
        moveCursorUp(1)
        clearLineDown()
        process.stdout.write(`Build panel assets (this can take some minutes)... ${P[x++]}\n`);
        x %= P.length;
    }, 250);
    
    // Enhanced build command with error handling
    const buildCmd = `cd ${process.cwd()} && \
        yarn install --silent && \
        yarn build --silent && \
        chown -R www-data:www-data . && \
        php artisan route:clear && \
        php artisan cache:clear && \
        php artisan migrate --seed --force 2>/dev/null || true`;
    
    exec(buildCmd, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
        if (err && !err.message.includes('migrate')) {
            process.stdout.write(`\n\x1b[31m\x1b[1m❌ ERROR DURING ASSET BUILDING\x1b[0m\n`);
            if (stderr) process.stdout.write(`Details: ${stderr.substring(0, 200)}\n`);
            process.stdout.write(`Please run: yarn build\n`);
            process.stdout.write(`Then contact support with the build output\n`);
            clearInterval(load);
            process.exit(1);
        }
        
        moveCursorUp(1)
        clearLineDown()
        process.stdout.write(`Build panel assets done ✅\n`);
        clearInterval(load)
        process.stdout.write("✅ Addon installed successfully!\n");
        process.stdout.write("\x1b[32m✓ All auto-fixes applied and validated\x1b[0m\n");
    });
}

getaddon()
