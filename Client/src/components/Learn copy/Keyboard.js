import React from 'react';
import { Button } from '@material-ui/core';

const Keyboard = ({ color, textColor }) => {

    return (
        <div className="teclado">
            <div className="fila-1">
                <Button variant="contained" style={{ background: color.q, color: textColor.q }}>q</Button>
                <Button variant="contained" style={{ background: color.w, color: textColor.w }}>w</Button>
                <Button variant="contained" style={{ background: color.e, color: textColor.e }}>e</Button>
                <Button variant="contained" style={{ background: color.r, color: textColor.r }}>r</Button>
                <Button variant="contained" style={{ background: color.t, color: textColor.t }}>t</Button>
                <Button variant="contained" style={{ background: color.y, color: textColor.y }}>y</Button>
                <Button variant="contained" style={{ background: color.u, color: textColor.u }}>u</Button>
                <Button variant="contained" style={{ background: color.i, color: textColor.i }}>i</Button>
                <Button variant="contained" style={{ background: color.o, color: textColor.o }}>o</Button>
                <Button variant="contained" style={{ background: color.p, color: textColor.p }}>p</Button>
            </div>

            <div className="fila-2">
                <Button variant="contained" style={{ background: color.a, color: textColor.a }}>a</Button>
                <Button variant="contained" style={{ background: color.s, color: textColor.s }}>s</Button>
                <Button variant="contained" style={{ background: color.d, color: textColor.d }}>d</Button>
                <Button variant="contained" style={{ background: color.f, color: textColor.f }}>f</Button>
                <Button variant="contained" style={{ background: color.g, color: textColor.g }}>g</Button>
                <Button variant="contained" style={{ background: color.h, color: textColor.h }}>h</Button>
                <Button variant="contained" style={{ background: color.j, color: textColor.j }}>j</Button>
                <Button variant="contained" style={{ background: color.k, color: textColor.k }}>k</Button>
                <Button variant="contained" style={{ background: color.l, color: textColor.l }}>l</Button>
                <Button variant="contained" style={{ background: color.ñ, color: textColor.ñ }}>ñ</Button>
            </div>

            <div className="fila-3">
                <Button variant="contained" style={{ background: color.z, color: textColor.z }}>z</Button>
                <Button variant="contained" style={{ background: color.x, color: textColor.x }}>x</Button>
                <Button variant="contained" style={{ background: color.c, color: textColor.c }}>c</Button>
                <Button variant="contained" style={{ background: color.v, color: textColor.v }}>v</Button>
                <Button variant="contained" style={{ background: color.b, color: textColor.b }}>b</Button>
                <Button variant="contained" style={{ background: color.n, color: textColor.n }}>n</Button>
                <Button variant="contained" style={{ background: color.m, color: textColor.m }}>m</Button>
                <Button variant="contained" style={{ background: color.coma, color: textColor.coma }}>,</Button>
                <Button variant="contained" style={{ background: color.punto, color: textColor.punto }}>.</Button>
            </div>

            <div className="fila-4">
                <button className="dedo-1" style={{ background: color[1] }}/>
                <button className="dedo-2" style={{ background: color[2] }}/>
                <button className="dedo-3" style={{ background: color[3] }}/>
                <button className="dedo-4" style={{ background: color[4] }}/>
                <button className="dedo-5" style={{ background: color[5] }}/>

                <div className="spacer"/>

                <button className="dedo-5" style={{ background: color[6] }}/>
                <button className="dedo-4" style={{ background: color[7] }}/>
                <button className="dedo-3" style={{ background: color[8] }}/>
                <button className="dedo-2" style={{ background: color[9] }}/>
                <button className="dedo-1" style={{ background: color[10] }}/>
            </div>
        </div>
    )
}

export default Keyboard