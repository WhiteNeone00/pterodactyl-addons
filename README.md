# Pterodactyl Addons (pterodactyl-addons)

Collection of Whee Service addons and installers for Pterodactyl Panel.

## Overview

Complete addon ecosystem with 15 major addon types, automatic installation via bagoucenter, and centralized license management.

## Key Features

- **15 Production Addons**: Fully tested addon packages
- **Automatic Installation**: One-click installer with bagoucenter integration
- **License Management**: Track and manage licenses for each addon
- **Centralized Control**: All addons managed from `/admin/bagoucenter`
- **Multi-Version Support**: Support for Pterodactyl 1.8+
- **Easy Updates**: Installer-based deployment

## Supported Addons

### Game Server Management
- **Minecraft Mods Installer (257)** - Install Minecraft mods via admin panel
- **Minecraft Plugins Installer (326)** - Install Spigot/Bukkit plugins
- **Minecraft Modpacks Installer (327)** - Install complete modpack configurations
- **Minecraft Versions Changer (296)** - Change Minecraft server version
- **Minecraft Jar Checker (456)** - Validate server JAR files
- **Minecraft Template Downloader (483)** - Download server templates
- **TxAdmin Auto Setup (267)** - Automatic TxAdmin configuration for FiveM
- **FiveM Resources Manager (278)** - Manage FiveM server resources
- **Artifacts Changer (271)** - Change server artifact versions

### Server Management
- **Server Importer Lite (288)** - Import existing servers easily
- **Server Limiter (371)** - Resource limiting and optimization
- **Server Splitter (450)** - Split servers for scaling
- **Pacman During Installation (438)** - Package management integration

### User & Network Management
- **User Avatar Changer (591)** - Allow users to change profile avatars
- **Subdomains Wizard (636)** - Manage subdomains for game servers

## Installation

### Quick Start

1. Clone the repository
```bash
git clone https://github.com/WhiteNeone00/pterodactyl-addons.git
cd pterodactyl-addons
```

2. Run the autoinstaller
```bash
cd autoinstaller
node autoinstaller.js
```

3. Enter your license key when prompted
4. Select which addon(s) to install
5. System automatically installs bagoucenter + selected addon(s)

### Manual Installation

For each addon, navigate to the addon directory and follow the included installation instructions:

```
pterodactyl-addons/
├── addons/
│   ├── Minecraft Mods Installer - 257/
│   ├── TxAdmin Auto Setup - 267/
│   ├── Artifacts Changer - 271/
│   ├── FiveM Resources Manager - 278/
│   ├── Server Importer Lite - 288/
│   ├── Minecraft Versions Changer - 296/
│   ├── Minecraft Plugins Installer - 326/
│   ├── Minecraft Modpacks Installer - 327/
│   ├── Server Limiter - 371/
│   ├── Pacman During Installation - 438/
│   ├── Server Splitter - 450/
│   ├── Minecraft Jar Checker - 456/
│   ├── Minecraft Template Downloader - 483/
│   ├── User Avatar Changer - 591/
│   └── Subdomains Wizard - 636/
├── autoinstaller/
│   ├── autoinstaller.js
│   └── addonfiles/
└── README.md
```

## Bagoucenter Integration

Every addon includes the complete **bagoucenter** system:

### What is Bagoucenter?

Bagoucenter is the central addon management system that provides:

- **License Management**: Track licenses per addon
- **Addon Control**: Enable/disable installed addons
- **Version Checking**: Monitor addon versions and updates
- **Settings Configuration**: Configure addon-specific settings
- **Support Access**: Direct support contact information

### Admin Panel

After any addon installation, access the management system at:

```
/admin/bagoucenter
```

#### Tabs Available:
- **Overview** - System status and API health
- **License** - Manage licenses for each addon
- **Version Checker** - Check addon versions and updates
- **Settings** - Configure addon parameters
- **Support** - Support contact information

## Project Structure

### Addon Directory Structure

Each addon directory contains:

```
Addon Name - ID/
├── Manual Install/              # Manual installation files
│   ├── panelfiles/             # Panel integration files
│   │   ├── app/                # Laravel controllers & models
│   │   ├── resources/          # Views & language files
│   │   └── database/           # Migrations
│   └── INSTALL.md
├── Automatic installer/         # Auto-installer variant
│   ├── panelfiles/
│   └── setup.sh
└── README.md
```

### Autoinstaller Directory

```
autoinstaller/
├── autoinstaller.js            # Main installer script
├── addonfiles/                 # Addon packages
│   ├── bagoucenter.zip
│   ├── addon_257.zip
│   ├── addon_267.zip
│   └── ... (other addons)
└── 257.json                    # Addon installer configs
├── 267.json
├── ... (other configs)
└── README.md
```

## License Management

### How Licenses Work

1. **Purchase**: User purchases an addon license
2. **Installation**: User runs `node autoinstaller.js`
3. **Validation**: System validates license with Whee Service API
4. **Installation**: If valid, addon + bagoucenter install automatically
5. **Management**: User manages license from `/admin/bagoucenter/license`

### License Database

```sql
CREATE TABLE bagoulicense (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  addon varchar(255) NOT NULL,
  license varchar(255) NOT NULL,
  usage int NOT NULL,
  maxusage int NOT NULL,
  enabled tinyint(1) NOT NULL,
  created_at timestamp NULL,
  updated_at timestamp NULL,
  PRIMARY KEY (id)
);
```

## Requirements

### System Requirements
- **Pterodactyl Panel**: 1.8+
- **PHP**: 8.0+
- **MySQL**: 5.7+
- **Node.js**: 14+ (for autoinstaller only)

### For Addons
- Varies by addon type
- See individual addon README files

## Configuration

### Environment Variables

Set in Pterodactyl's `.env`:

```
# Bagoucenter API
BAGOUCENTER_API=https://api.whee.lol
ADDON_LICENSE_CHECK=true

# CDN for addon files
ADDON_CDN=https://cdn.whee.lol
```

### Pterodactyl Integration

The addons integrate with Pterodactyl by:

1. Adding controllers to `/app/Http/Controllers/`
2. Adding routes to `/routes/admin.php`
3. Adding migrations to `/database/migrations/`
4. Adding views to `/resources/views/admin/`

## Addon Updates

Each addon can be updated independently:

1. Check for updates in `/admin/bagoucenter/versions`
2. Download new version
3. Install via bagoucenter UI
4. Existing configuration is preserved

## Troubleshooting

### Installation Issues

**License validation fails**
- Verify license key is correct
- Check API connectivity: `curl https://api.whee.lol/...`
- Ensure license is active

**Files don't extract**
- Verify zip files are not corrupted
- Check disk space on server
- Verify permissions on upload directory

**Routes not appearing**
- Run: `php artisan route:cache`
- Verify migrations ran: `php artisan migrate --force`
- Check Pterodactyl routing configuration

### Runtime Issues

**Addon not showing in bagoucenter**
- Verify license is enabled in database
- Check addon is properly installed
- Clear Laravel cache: `php artisan cache:clear`

## Support

For addon-specific issues:
1. Check addon's individual README
2. Review error logs in Pterodactyl
3. Use support feature in `/admin/bagoucenter/support`

## Development

### Contributing

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Follow Laravel conventions
- Use PSR-12 for PHP
- Comment complex logic
- Add tests for new features

## License

All rights reserved.
- The API's source code is available on GitHub for users who wish to rehost and use it.

---

## Repository Structure

### Main Directories
1. **addons/**:  
   This directory contains the main add-on folders. Each folder represents a specific add-on and includes its respective files.

   - [**PhpMyAdmin Button**: `197/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/PhpMyAdmin%20Button%20-%20197)
   - [**Auto Update**: `204/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Auto%20Update%20-%20204)
   - [**TxAdmin Button**: `213/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/TxAdmin%20Button%20-%20213)
   - [**Minecraft Mods Installer**: `257/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Mods%20Installer%20-%20257)
   - [**TxAdmin Auto Setup**: `267/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/TxAdmin%20Auto%20Setup%20-%20267)
   - [**Artifacts Changer**: `271/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Artifacts%20Changer%20-%20271)
   - [**FiveM GameBuild Changer**: `273/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/FiveM%20GameBuild%20Changer%20-%20273)
   - [**FiveM Resources Manager**: `278/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/FiveM%20Resources%20Manager%20-%20278)
   - [**Minecraft Server Icon Changer**: `281/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Server%20Icon%20Changer%20-%20281)
   - [**Server BanIp (Firewall)**: `284/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Server%20BanIp%20%28Firewall%29%20-%20284)
   - [**Server Importer Lite**: `288/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Server%20Importer%20Lite%20-%20288)
   - [**Minecraft Versions Changer**: `296/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Versions%20Changer%20-%20296)
   - [**Minecraft Bedrock Version Changer**: `298/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Bedrock%20Version%20Changer%20-%20298)
   - [**Minecraft Versions Changer Bundle**: `299/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Versions%20Changer%20Bundle%20-%20299)
   - [**Fivem Addons Pack**: `323/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Fivem%20Addons%20Pack%20-%20323)
   - [**Minecraft Plugins Installer**: `326/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Plugins%20Installer%20-%20326)
   - [**Minecraft Modpacks Installer**: `327/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Modpacks%20Installer%20-%20327)
   - [**Egg Name Before Server Name**: `344/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Egg%20Name%20Before%20Server%20Name%20-%20344)
   - [**Server Limiter**: `371/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Server%20Limiter%20-%20371)
   - [**Minecraft Addons Pack**: `388/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Addons%20Pack%20-%20388)
   - [**FiveM MySQL Connection String Injector**: `389/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/FiveM%20MySQL%20Connection%20String%20Injector%20-%20389)
   - [**Pacman During Installation or Suspension**: `438/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Pacman%20During%20Installation%20or%20Suspension%20-%20438)
   - [**Server Splitter**: `450/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Server%20Splitter%20-%20450)
   - [**Minecraft Jar Checker**: `456/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Jar%20Checker%20-%20456)
   - [**Server Importer Pro**: `462/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Server%20Importer%20Pro%20-%20462)
   - [**Minecraft Template Downloader**: `483/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Minecraft%20Template%20Downloader%20-%20483)
   - [**Cloud Servers**: `585/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Cloud%20Servers%20-%20585)
   - [**User Avatar Changer**: `591/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/User%20Avatar%20Changer%20-%20591)
   - [**Console Message Editor**: `594/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Console%20Message%20Editor%20-%20594)
   - [**FiveM Cache Remover**: `630/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/FiveM%20Cache%20Remover%20-%20630)
   - [**Subdomains Wizard**: `636/`](https://github.com/Bagou450-Fixed/pterodactyl-addons/tree/main/addons/Subdomains%20Wizard%20-%20636)

2. **autoinstaller/**:  
   Contains configuration files (`.json`) and JavaScript files to automate the installation of add-ons.

3. **modpacksegg/**:  
   Contains JSON configuration files for modpacks such as CurseForge, FTB, and TechnicPack.

4. **Others/**:  
   Contains utility scripts and components used for server-side operations, such as:
   - `ServerRouter.tsx` - Router logic.
   - `SideBarElements.tsx` - Sidebar UI elements.

---

## Contribution Guidelines

- Contributions are welcome to improve the codebase.
- Please ensure pull requests are clear and provide meaningful enhancements.
- No official support will be provided for these add-ons.

---

Thank you for supporting Whee Service's legacy! 🎉
