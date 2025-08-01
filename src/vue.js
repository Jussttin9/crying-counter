const { createApp } = Vue;

const numLiquidLevels = 8;
const maxDrops = 200;
const liquidLevelThresh = Math.round(maxDrops / numLiquidLevels);

const instance = createApp ({
    data() {
        return {
            curDrops: 0,
            liquidLevelSrc: "",
            liquidLevel: 0,
            cursorHidden: null,
            happyDropCount: 0,
            happyDropPercentage: 0
        };
    },
    watch: {
        curDrops(numDrops) {
            for (let threshold = 0; threshold <= numLiquidLevels; threshold++) {
                if (numDrops < liquidLevelThresh * (threshold + 1)) {
                    this.liquidLevelSrc = threshold == 0 ? "" : `../assets/Jar/Liquid_levels/level_${threshold}.PNG`;
                    this.liquidLevel = threshold;
                    break;
                }
            }
        }
    },
    computed: {
        jarStyle() {
            if (this.liquidLevel == numLiquidLevels) {
              return {
                height: "11.75rem",
                width: "11rem"
              };
            } else if (this.liquidLevel > 6) {
                const size = `calc(9rem + ${this.liquidLevel - 6}rem)`;
                return {
                    height: size,
                    width: size
                };
            }
            return {};
        }
    },
    methods: {
        addDrop() {
            if (document.body.style.cursor == "none") {
                this.curDrops += 1;
                if (this.cursorHidden === 'happy') {
                    this.happyDropCount += 1;
                }
                this.happyDropPercentage = parseInt((this.happyDropCount / this.curDrops) * 100)
            }
        },
    }
})

const app = instance.mount('#app');
export default app;