export class GUI {
    constructor(settings) {
        this.settings = settings;
        this._initSceneControls();
        this._loadSettings();
    }

    _initSceneControls() {
        this.scene_controls = document.getElementById("scene_controls");
        this.controls_container = this.scene_controls.querySelector(".controls-container");
        this.scene_controls_thumb = document.getElementById("scene_controls_thumb");

        this.htmlArrowUp = `<img src="images/expand_less.svg" alt="arrow_up"/>`;
        this.htmlArrowDown = `<img src="images/expand_more.svg" alt="arrow_up"/>`;

        this.scene_controls_thumb.onclick = () => {
            this.scene_controls.classList.toggle("active");

            if (this.scene_controls.classList.contains("active"))
                this.scene_controls_thumb.innerHTML = this.htmlArrowDown;
            else
                this.scene_controls_thumb.innerHTML = this.htmlArrowUp;
        };
    }

    _loadSettings() {
        this.settings.forEach(setting => {
            this._createSettingHTML(setting);
        });
    }

    _createSettingHTML(setting) {
        const element = document.createElement("div");
        element.classList.add("button");
        element.id = `setting_${setting.name}`;

        const settingName = document.createElement("div");
        settingName.classList.add("setting-name");
        settingName.innerHTML = setting.name;

        const settingIcon = document.createElement("div");
        settingIcon.classList.add("setting-icon");
        settingIcon.innerHTML = setting.icon;

        const settingOptions = document.createElement("div");
        settingOptions.classList.add("setting-options");
        settingOptions.id = `options_${setting.name}`;

        if (setting.options) {
            const optionsContainer = document.createElement("div");
            optionsContainer.classList.add("options-container");
            setting.options.forEach(option => {
                this._createOptionHTML(option, optionsContainer);
            });
            settingOptions.appendChild(optionsContainer);
        }

        element.appendChild(settingName);
        element.appendChild(settingIcon);
        element.appendChild(settingOptions);
        this.controls_container.appendChild(element);

        element.onclick = () => {
            if (setting.options)
                settingOptions.classList.toggle("active");
            else
                setting.action();
        };
    }

    _createOptionHTML(option, optionsContainer) {
        const optionButton = document.createElement("div");
        optionButton.id = `option_${option.name}`;
        optionButton.classList.add("button");

        if (option.selected)
            optionButton.classList.add("selected");

        optionButton.innerHTML = `
            <div class="option-icon">${option.icon}</div>
            <div class="option-name">${option.name}</div>
            ${option.subtitle ? `<div class="option-subtitle">${option.subtitle}</div>` : ""}
        `;

        optionButton.onclick = () => {
            option.action();
            optionsContainer.querySelectorAll(".button").forEach(button => {
                button.classList.remove("selected");
            });
            optionButton.classList.add("selected");
        }

        optionsContainer.appendChild(optionButton);
    }
}