<template>
    <div class="dice-component">
        <div class="dice-table">
            <div class="content">
                <div class="die" :class="{ rolling: isRolling }" :data-face="currentFace" @click="roll">
                    <figure v-for="n in 20" :key="n" :class="`face face-${n}`"></figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const currentFace = ref(1)
const isRolling = ref(false)
const lastFace = ref(null)
let timeoutId = null

const animationDuration = 3000

function randomFace() {
    let face = Math.floor(Math.random() * 20) + 1
    if (face === lastFace.value) {
        return randomFace()
    }
    lastFace.value = face
    return face
}

function rollTo(face) {
    clearTimeout(timeoutId)
    currentFace.value = face
}

function roll() {
    isRolling.value = true
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
        isRolling.value = false
        rollTo(randomFace())
    }, animationDuration)
}
</script>

<style scoped lang="scss">
@use 'sass:math';

$containerWidth: 90px;
$containerHeight: $containerWidth;

$faceWidth: $containerWidth * 0.5;
$faceHeight: $faceWidth * 0.86;

$transitionDuration: 0.5s;
$animationDuration: 3s;

$angle: 54deg;
$ringAngle: -11deg;
$sideAngle: math.div(360deg, 5);
$opacity: 0.95;
$color: rgba(255, 215, 0, $opacity);

$rotateX: -$angle;
$translateZ: $faceWidth * 0.335;
$translateY: -$faceHeight * 0.15;
$translateRingZ: $faceWidth * 0.75;
$translateRingY: $faceHeight * 0.78 + $translateY;
$translateLowerZ: $translateZ;
$translateLowerY: $faceHeight * 0.78 + $translateRingY;

@keyframes roll {
    10% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)
    }

    30% {
        transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(10px) translateY(10px)
    }

    50% {
        transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-10px) translateY(-10px)
    }

    70% {
        transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg)
    }

    90% {
        transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg)
    }
}

.dice-component {
    padding: 0;
}

.dice-table {
    background: linear-gradient(135deg, #000 0%, #0d3d0d 100%);
    border-radius: 12px;
    padding: 20px;
    box-shadow:
        inset 0 2px 8px rgba(0, 0, 0, 0.4),
        0 4px 12px rgba(0, 0, 0, 0.3);
    border: 3px solid #8b6f47;
    position: relative;
    margin-top: 30px;
    min-height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 10px;
        background: repeating-linear-gradient(45deg,
                transparent,
                transparent 10px,
                rgba(0, 0, 0, 0.03) 10px,
                rgba(0, 0, 0, 0.03) 20px);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        padding: 15px;
        min-height: 110px;
    }
}

.content {
    margin: auto;
    position: relative;
    width: $containerWidth;
    height: $containerHeight;
    perspective: 1500px;
}

.die {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform $transitionDuration ease-out;
    cursor: pointer;
    transform: rotateX($rotateX);

    &.rolling {
        animation: roll $animationDuration linear;
    }

    @for $i from 1 through 5 {
        &[data-face="#{$i}"] {
            $angleMultiplier: $i - 1;
            transform: rotateX(-$angle) rotateY($sideAngle * $angleMultiplier);
        }
    }

    @for $i from 16 through 20 {
        &[data-face="#{$i}"] {
            $angleMultiplier: $i - 15;
            transform: rotateX(-$angle + 180deg) rotateY(-$sideAngle * $angleMultiplier);
        }
    }

    @for $i from 6 through 10 {
        &[data-face="#{$i}"] {
            $angleMultiplier: $i - 6;
            transform: rotateX(-$ringAngle) rotateZ(180deg) rotateY($sideAngle * $angleMultiplier);
        }
    }

    @for $i from 11 through 15 {
        &[data-face="#{$i}"] {
            $angleMultiplier: $i - 8;
            transform: rotateX(-$ringAngle) rotateY(-$sideAngle * $angleMultiplier - math.div($sideAngle, 2));
        }
    }

    .face {
        $horizontalMargin: -$faceWidth * 0.5;

        position: absolute;
        left: 50%;
        top: 0;
        margin: 0 $horizontalMargin;
        border-left: $faceWidth * 0.5 solid transparent;
        border-right: $faceWidth * 0.5 solid transparent;
        border-bottom: $faceHeight solid $color;
        width: 0px;
        height: 0px;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        counter-increment: steps 1;

        &:before {
            content: counter(steps);
            position: absolute;
            top: calc(#{$faceHeight * 0.25} - 1px); //altura dos numeros
            left: -$faceWidth;
            color: #000;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
            font-size: $faceHeight * 0.5;
            text-align: center;
            line-height: $faceHeight * 0.9;
            width: $faceWidth * 2;
            height: $faceHeight;
        }

        @for $i from 1 through 5 {
            &:nth-child(#{$i}) {
                $angleMultiplier: $i - 1;
                transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateZ) translateY($translateY) rotateX($angle);
            }
        }

        @for $i from 16 through 20 {
            &:nth-child(#{$i}) {
                $angleMultiplier: $i - 18;
                transform: rotateY($sideAngle * $angleMultiplier + math.div($sideAngle, 2)) translateZ($translateLowerZ) translateY($translateLowerY) rotateZ(180deg) rotateX($angle);
            }
        }

        @for $i from 6 through 10 {
            &:nth-child(#{$i}) {
                $angleMultiplier: $i - 11;
                transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateRingZ) translateY($translateRingY) rotateZ(180deg) rotateX($ringAngle);
            }
        }

        @for $i from 11 through 15 {
            &:nth-child(#{$i}) {
                $angleMultiplier: $i - 8;
                transform: rotateY($sideAngle * $angleMultiplier + math.div($sideAngle, 2)) translateZ($translateRingZ) translateY($translateRingY) rotateX($ringAngle);
            }
        }
    }
}
</style>
