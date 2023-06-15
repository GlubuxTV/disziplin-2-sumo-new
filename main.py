def attack_1(nr: number):
    if nr < 20:
        maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_ON)
        maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_ON)
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 255)
        basic.pause(2000)
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, 255)
        basic.pause(200)
        maqueen.motor_stop(maqueen.Motors.M1)
        basic.pause(500)
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, 100)
        basic.pause(300)
        maqueen.motor_stop(maqueen.Motors.ALL)
        maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_OFF)
        maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_OFF)
attack1 = 0
status = 0
maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 255)

def on_forever():
    global status, attack1
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 or maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
        maqueen.motor_stop(maqueen.Motors.ALL)
        status = 505
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, 255)
        basic.pause(500)
        maqueen.motor_stop(maqueen.Motors.M1)
        basic.pause(1200)
        maqueen.motor_stop(maqueen.Motors.ALL)
    elif maqueen.ultrasonic(PingUnit.CENTIMETERS) <= 20:
        attack1 = 0
basic.forever(on_forever)
