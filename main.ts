input.onButtonPressed(Button.A, function () {
    music.setVolume(0)
})
input.onButtonPressed(Button.B, function () {
    music.setVolume(255)
})
let fehrnsicht = 0
let status = 0
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorStop(maqueen.Motors.All)
        status = 3
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 255)
        basic.pause(100)
        maqueen.motorStop(maqueen.Motors.M1)
        basic.pause(1000)
        maqueen.motorStop(maqueen.Motors.All)
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
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
            if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 50) {
                fehrnsicht = 1
                basic.pause(100)
                maqueen.motorStop(maqueen.Motors.All)
            }
        }
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
    }
})
