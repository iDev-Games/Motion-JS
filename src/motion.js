/* Motion.js v1.0.0 by iDev Games */
class Motion
{
    motions = [];
    theProgress = [];
    startTime = 0;
    animationState = ["motion-paused", "motion-playing"];
    motionClass = 'motion-playing';
    observer;
    rafId = null;
    motionAttributesCache = new Map();
    elementStartTimes = new Map();

    constructor() {
        this.motionInit = this.motionInit.bind(this);
        this.motionTick = this.motionTick.bind(this);
        this.motionCheckElements = this.motionCheckElements.bind(this);
        this.observer = new IntersectionObserver(this.motionObserver.bind(this));
        this.startTime = performance.now();
        this.paused = false;
    }

    motionInit() {
        this.observer = new IntersectionObserver(this.motionObserver.bind(this));
        this.motions = document.querySelectorAll('body,.enable-motion,[data-motion]');
        this.motionCheckElements();
        this.motionStart();
    }

    pause() {
        this.paused = true;
        this.motionStop();
    }

    play() {
        this.paused = false;
        this.motionStart();
    }

    motionStart() {
        if (!this.rafId && !this.paused) {
            this.rafId = setInterval(() => this.motionTick(performance.now()), 1000);
        }
    }

    motionStop() {
        if (this.rafId) {
            clearInterval(this.rafId);
            this.rafId = null;
        }
    }

    motionCheckElements() {
        if (!this.motions || this.motions.length === 0) return;
        this.motions.forEach((element, index) => {
            element.index = index;
            this.observer.observe(element);
        });
    }

    motionTick(timestamp) {
        if (!this.motions || this.motions.length === 0) {
            return;
        }
        this.motions.forEach((element) => {
            if (this.isElementVisible(element)) {
                this.motionCalculate(element, timestamp);
                this.updateProgress(element);
            }
        });
    }

    isElementVisible(element) {
        if (element === document.body) return true;
        return element.classList.contains("motion");
    }

    motionObserver(entries) {
        entries.forEach((entry) => {
            this.motionIntersecting(entry);
        });
    }

    motionIntersecting(entry) {
        if (document.body !== entry.target) {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains("motion")) {
                    entry.target.classList.add("motion", this.motionClass);
                    if (!this.elementStartTimes.has(entry.target)) {
                        this.elementStartTimes.set(entry.target, performance.now());
                    }
                }
            } else {
                entry.target.classList.remove("motion", "motion-playing", "motion-paused");
            }
        }
    }

    motionCalculate(element, timestamp) {
        const options = this.getMotionOptions(element);
        let elementStart = this.elementStartTimes.get(element) || this.startTime;
        elementStart += options.delay;
        const elapsed = timestamp - elementStart;
        if (elapsed < 0) {
            this.motionSetProgress(0, options.min, options.max, element);
            return;
        }
        const cycleTime = options.duration > 0 ? elapsed % options.duration : elapsed;
        const linearProgress = options.duration > 0 ? (cycleTime / options.duration) * 100 : 0;
        const loopCount = options.duration > 0 ? Math.floor(elapsed / options.duration) : 0;
        this.theProgress[element.index] = {
            time: Math.floor(elapsed),
            progress: linearProgress,
            loop: loopCount,
            bounce: this.calculateBounce(linearProgress),
            noise: this.calculateNoise(timestamp, element.index)
        };
    }

    calculateBounce(progress) {
        return progress <= 50 ? progress * 2 : (100 - progress) * 2;
    }

    calculateNoise(timestamp, index) {
        const offset = index * 1000;
        const t = (timestamp + offset) / 1000;
        const noise = (Math.sin(t * 2.1) + Math.sin(t * 3.7) + Math.sin(t * 5.3)) / 3;
        return ((noise + 1) / 2) * 100;
    }

    getMotionOptions(element) {
        const defaultOptions = {
            duration: 1000,
            delay: 0,
            min: 0,
            max: 100
        };
        Object.keys(defaultOptions).forEach((key) => {
            defaultOptions[key] = this.motionAttributes(element, defaultOptions, key);
        });
        return defaultOptions;
    }

    motionAttributes(element, options, name) {
        let cachedValue = this.motionAttributesCache.get(element);
        if (!cachedValue) {
            cachedValue = {};
            this.motionAttributesCache.set(element, cachedValue);
        }

        let dSet = element.getAttribute("data-motion-" + name);
        if (dSet) {
            cachedValue[name] = parseFloat(dSet);
        }

        return cachedValue[name] ?? options[name];
    }

    motionSetProgress(progress, min, max, element) {
        const clampedProgress = Math.max(min, Math.min(max, progress));

        if (!this.theProgress[element.index]) {
            this.theProgress[element.index] = {};
        }

        this.theProgress[element.index].progress = clampedProgress;
    }

    motionSetBody(element) {
        const cl = element.classList;
        this.updateMotionState(cl);
        this.applySplitPoints(element);
    }

    updateMotionState(cl) {
        if (cl.contains(this.animationState[0])) {
            cl.replace(this.animationState[0], this.animationState[1]);
        } else if (!cl.contains(this.animationState[1])) {
            cl.add("motion-playing");
        }
    }

    applySplitPoints(element) {
        if (!this.theProgress[element.index]) return;

        const progress = this.theProgress[element.index].progress || 0;
        const splitPoints = [0, 25, 50, 75, 100];
        splitPoints.forEach((split) => this.motionSplit(split, progress, element.classList));
    }

    motionSplit(split, progress, cl) {
        if (split === 0 || split === 100) {
            this.motionSplitEquals(split, progress, cl);
        } else {
            this.motionSplitMoreThan(split, progress, cl);
        }
    }

    motionSplitEquals(split, progress, cl) {
        const BUFFER = 1;

        const boundaries = {
            0: { name: "start", min: 0, max: BUFFER },
            100: { name: "end", min: 100 - BUFFER, max: 100 }
        };

        if (boundaries[split]) {
            const { name, min, max } = boundaries[split];
            cl.toggle(`motion-progress-${name}`, progress >= min && progress <= max);
        }
    }

    motionSplitMoreThan(split, progress, cl) {
        if (progress >= split) {
            cl.add("motion-progress-" + split);
        } else if (progress < split) {
            cl.remove("motion-progress-" + split);
        }
    }

    motionSetVars(element, el, id) {
        if (!this.theProgress[element.index]) return;

        const progressData = this.theProgress[element.index];
        const roundedProgress = Math.ceil(progressData.progress || 0);
        const time = progressData.time || 0;
        const loop = progressData.loop || 0;
        const bounce = Math.ceil(progressData.bounce || 0);
        const noise = Math.ceil(progressData.noise || 0);

        const properties = {
            motionVar: {
                key: '--motion-progress',
                value: `${roundedProgress}%`,
                reverse: `${100 - roundedProgress}%`
            },
            motionTime: {
                key: '--motion-time',
                value: `${time}`,
                reverse: `${-time}`
            },
            motionLoop: {
                key: '--motion-loop',
                value: `${loop}`,
                reverse: `${-loop}`
            },
            motionBounce: {
                key: '--motion-bounce',
                value: `${bounce}%`,
                reverse: `${100 - bounce}%`
            },
            motionNoise: {
                key: '--motion-noise',
                value: `${noise}%`,
                reverse: `${100 - noise}%`
            },
            motionDegrees: {
                key: '--motion-deg',
                value: `${Math.ceil((roundedProgress / 100) * 360)}deg`,
                reverse: `${Math.ceil((roundedProgress / 100) * -360)}deg`
            }
        };
        this.setCSSVariables(el, id, properties, element);
    }

    setCSSVariables(el, id, properties, element) {
        Object.entries(properties).forEach(([attr, { key, value, reverse }]) => {
            if (el.getPropertyValue(key) !== value) {
                if (element.dataset[attr] !== undefined || element === document.body) {
                    if (element.dataset[attr] !== undefined) {
                        element.dataset[attr] = Math.round(parseInt(value) / 10) * 10;
                    }
                    el.setProperty(key + id, value);
                    el.setProperty(key + id + "-reverse", reverse);
                }
            }
        });
    }

    updateProgress(element) {
        if (element.dataset.motionGlobal === "true") {
            var el = document.documentElement.style;
            var id = "-" + element.id;
        } else {
            var el = element.style;
            var id = "";
        }
        if (document.body === element) {
            this.motionSetBody(element);
        }
        this.motionSetVars(element, el, id);
    }
}
window.motion = new Motion();

window.addEventListener('load', motion.motionInit, { passive: true });
