input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if ((0 as any) == (4 as any)) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 20) {
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
            basic.pause(4000)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 255)
            basic.pause(200)
            maqueen.motorStop(maqueen.Motors.M1)
            basic.pause(500)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 255)
            basic.pause(200)
            maqueen.motorStop(maqueen.Motors.All)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        }
    }
})
let fehrnsicht = 0
let status = 0
let strip = neopixel.create(DigitalPin.P15, 24, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        status = 3
        maqueen.motorStop(maqueen.Motors.All)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 255)
        basic.pause(500)
        maqueen.motorStop(maqueen.Motors.M1)
        basic.pause(1200)
        maqueen.motorStop(maqueen.Motors.All)
        strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
        status = 4
    } else {
        if (status == 4) {
            status = 1
            basic.pause(100)
            status = 0
        }
    }
})
basic.forever(function () {
    if (status == 1) {
        maqueen.motorStop(maqueen.Motors.All)
        fehrnsicht = 0
        while (fehrnsicht == 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
            if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 50) {
                fehrnsicht = 1
                basic.pause(100)
                maqueen.motorStop(maqueen.Motors.All)
            }
        }
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
    }
})
