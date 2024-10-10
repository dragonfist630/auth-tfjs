import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose';

const Thumb = Finger.Thumb;
const Index = Finger.Index;
const Middle = Finger.Middle;
const Ring = Finger.Ring;
const Pinky = Finger.Pinky;

const NoCurl = FingerCurl.NoCurl;
const FullCurl = FingerCurl.FullCurl;
const HalfCurl = FingerCurl.HalfCurl;

const VerticalUpRight = FingerDirection.VerticalUpRight;
const VerticalUp = FingerDirection.VerticalUp;
const VerticalDown = FingerDirection.VerticalDown;
const DiagonalUpRight = FingerDirection.DiagonalUpRight;
const DiagonalDownRight = FingerDirection.DiagonalDownRight;
const DiagonalUpLeft = FingerDirection.DiagonalUpLeft;

const HorizontalRight = FingerDirection.HorizontalRight;
const HorizontalLeft = FingerDirection.HorizontalLeft;

export const a_ASL = new GestureDescription('A');
a_ASL.addCurl(Thumb, NoCurl, 1.0);
a_ASL.addDirection(Index, VerticalUpRight, 0.7);
a_ASL.addCurl(Index, FullCurl, 1);
a_ASL.addDirection(Index, VerticalDown, 0.7);
a_ASL.addCurl(Middle, FullCurl, 1);
a_ASL.addDirection(Middle, VerticalUp, 0.7);
a_ASL.addCurl(Ring, FullCurl, 1);
a_ASL.addDirection(Ring, VerticalUp, 0.7);
a_ASL.addCurl(Pinky, FullCurl, 1);
a_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const b_ASL = new GestureDescription('B');
b_ASL.addCurl(Thumb, HalfCurl, 1.0);
b_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
b_ASL.addDirection(Index, DiagonalUpRight, 0.7);
b_ASL.addCurl(Index, NoCurl, 1);
b_ASL.addDirection(Index, VerticalUp, 0.7);
b_ASL.addCurl(Middle, NoCurl, 1);
b_ASL.addDirection(Middle, VerticalUp, 0.7);
b_ASL.addCurl(Ring, NoCurl, 1);
b_ASL.addDirection(Ring, VerticalUp, 0.7);
b_ASL.addCurl(Pinky, NoCurl, 1);
b_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const c_ASL = new GestureDescription('C');
c_ASL.addCurl(Thumb, NoCurl, 1);
c_ASL.addDirection(Index, DiagonalUpRight, 0.7);
c_ASL.addCurl(Index, NoCurl, 1);
c_ASL.addDirection(Index, DiagonalUpRight, 0.7);
c_ASL.addCurl(Middle, HalfCurl, 1);
c_ASL.addDirection(Middle, DiagonalUpRight, 0.7);
c_ASL.addCurl(Ring, HalfCurl, 1);
c_ASL.addDirection(Ring, DiagonalUpRight, 0.7);
c_ASL.addCurl(Pinky, HalfCurl, 1);
c_ASL.addDirection(Pinky, DiagonalUpRight, 0.7);

export const d_ASL = new GestureDescription('D');
d_ASL.addCurl(Thumb, HalfCurl, 1);
d_ASL.addDirection(Index, VerticalUp, 0.7);
d_ASL.addCurl(Index, NoCurl, 1);
d_ASL.addDirection(Index, VerticalUp, 0.7);
d_ASL.addCurl(Middle, FullCurl, 1);
d_ASL.addDirection(Middle, VerticalUp, 0.7);
d_ASL.addCurl(Ring, FullCurl, 1);
d_ASL.addDirection(Ring, VerticalUp, 0.7);
d_ASL.addCurl(Pinky, FullCurl, 1);
d_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const e_ASL = new GestureDescription('E');
e_ASL.addCurl(Thumb, HalfCurl, 1);
e_ASL.addDirection(Index, VerticalUp, 0.7);
e_ASL.addCurl(Index, FullCurl, 1);
e_ASL.addDirection(Index, VerticalUp, 0.7);
e_ASL.addCurl(Middle, FullCurl, 1);
e_ASL.addDirection(Middle, VerticalUp, 0.7);
e_ASL.addCurl(Ring, FullCurl, 1);
e_ASL.addDirection(Ring, VerticalUp, 0.7);
e_ASL.addCurl(Pinky, FullCurl, 1);
e_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const f_ASL = new GestureDescription('F');
f_ASL.addCurl(Thumb, HalfCurl, 1);
f_ASL.addDirection(Index, DiagonalUpRight, 0.7);
f_ASL.addCurl(Index, FullCurl, 1);
f_ASL.addDirection(Index, DiagonalUpRight, 0.7);
f_ASL.addCurl(Middle, NoCurl, 1);
f_ASL.addDirection(Middle, VerticalUp, 0.7);
f_ASL.addCurl(Ring, NoCurl, 1);
f_ASL.addDirection(Ring, VerticalUp, 0.7);
f_ASL.addCurl(Pinky, NoCurl, 1);
f_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const g_ASL = new GestureDescription('G');
g_ASL.addCurl(Thumb, NoCurl, 1);
g_ASL.addDirection(Index, DiagonalUpRight, 0.7);
g_ASL.addCurl(Index, NoCurl, 1);
g_ASL.addDirection(Index, HorizontalRight, 0.7);
g_ASL.addCurl(Middle, FullCurl, 1);
g_ASL.addDirection(Middle, DiagonalUpRight, 0.7);
g_ASL.addCurl(Ring, FullCurl, 1);
g_ASL.addDirection(Ring, HorizontalRight, 0.7);
g_ASL.addCurl(Pinky, FullCurl, 1);
g_ASL.addDirection(Pinky, HorizontalRight, 0.7);

export const h_ASL = new GestureDescription('H');
h_ASL.addCurl(Thumb, NoCurl, 1);
h_ASL.addDirection(Index, HorizontalRight, 0.7);
h_ASL.addCurl(Index, NoCurl, 1);
h_ASL.addDirection(Index, HorizontalRight, 0.7);
h_ASL.addCurl(Middle, NoCurl, 1);
h_ASL.addDirection(Middle, HorizontalRight, 0.7);
h_ASL.addCurl(Ring, FullCurl, 1);
h_ASL.addDirection(Ring, HorizontalRight, 0.7);
h_ASL.addCurl(Pinky, FullCurl, 1);
h_ASL.addDirection(Pinky, HorizontalRight, 0.7);

export const i_ASL = new GestureDescription('I');
i_ASL.addCurl(Thumb, HalfCurl, 1);
i_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
i_ASL.addCurl(Index, FullCurl, 1);
i_ASL.addDirection(Index, VerticalUp, 0.7);
i_ASL.addCurl(Middle, FullCurl, 1);
i_ASL.addDirection(Middle, VerticalUp, 0.7);
i_ASL.addCurl(Ring, FullCurl, 1);
i_ASL.addDirection(Ring, VerticalUp, 0.7);
i_ASL.addCurl(Pinky, NoCurl, 1);
i_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const j_ASL = new GestureDescription('J');
j_ASL.addCurl(Thumb, NoCurl, 1);
j_ASL.addDirection(Index, DiagonalUpRight, 0.7);
j_ASL.addCurl(Index, FullCurl, 1);
j_ASL.addDirection(Index, DiagonalUpRight, 0.7);
j_ASL.addCurl(Middle, FullCurl, 1);
j_ASL.addDirection(Middle, DiagonalUpRight, 0.7);
j_ASL.addCurl(Ring, FullCurl, 1);
j_ASL.addDirection(Ring, HorizontalRight, 0.7);
j_ASL.addCurl(Pinky, NoCurl, 1);
j_ASL.addDirection(Pinky, HorizontalRight, 0.7);

export const k_ASL = new GestureDescription('K');
k_ASL.addCurl(Thumb, NoCurl, 1);
k_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
k_ASL.addCurl(Index, NoCurl, 1);
k_ASL.addDirection(Index, DiagonalUpRight, 0.7);
k_ASL.addCurl(Middle, NoCurl, 1);
k_ASL.addDirection(Middle, VerticalUp, 0.7);
k_ASL.addCurl(Ring, FullCurl, 1);
k_ASL.addDirection(Ring, VerticalUp, 0.7);
k_ASL.addCurl(Pinky, FullCurl, 1);
k_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const l_ASL = new GestureDescription('L');
l_ASL.addCurl(Thumb, NoCurl, 1);
l_ASL.addDirection(Index, DiagonalUpRight, 0.7);
l_ASL.addCurl(Index, NoCurl, 1);
l_ASL.addDirection(Index, VerticalUp, 0.7);
l_ASL.addCurl(Middle, FullCurl, 1);
l_ASL.addDirection(Middle, VerticalUp, 0.7);
l_ASL.addCurl(Ring, FullCurl, 1);
l_ASL.addDirection(Ring, VerticalUp, 0.7);
l_ASL.addCurl(Pinky, FullCurl, 1);
l_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const m_ASL = new GestureDescription('M');
m_ASL.addCurl(Thumb, HalfCurl, 1);
m_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
m_ASL.addCurl(Index, FullCurl, 1);
m_ASL.addDirection(Index, DiagonalUpRight, 0.7);
m_ASL.addCurl(Middle, FullCurl, 1);
m_ASL.addDirection(Middle, VerticalUp, 0.7);
m_ASL.addCurl(Ring, FullCurl, 1);
m_ASL.addDirection(Ring, VerticalUp, 0.7);
m_ASL.addCurl(Pinky, FullCurl, 1);
m_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const n_ASL = new GestureDescription('N');
n_ASL.addCurl(Thumb, HalfCurl, 1);
n_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
n_ASL.addCurl(Index, FullCurl, 1);
n_ASL.addDirection(Index, DiagonalUpRight, 0.7);
n_ASL.addCurl(Middle, FullCurl, 1);
n_ASL.addDirection(Middle, VerticalUp, 0.7);
n_ASL.addCurl(Ring, FullCurl, 1);
n_ASL.addDirection(Ring, VerticalUp, 0.7);
n_ASL.addCurl(Pinky, FullCurl, 1);
n_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const o_ASL = new GestureDescription('O');
o_ASL.addCurl(Thumb, NoCurl, 1);
o_ASL.addDirection(Index, DiagonalUpRight, 0.7);
o_ASL.addCurl(Index, HalfCurl, 1);
o_ASL.addDirection(Index, DiagonalUpRight, 0.7);
o_ASL.addCurl(Middle, HalfCurl, 1);
o_ASL.addDirection(Middle, DiagonalUpRight, 0.7);
o_ASL.addCurl(Ring, FullCurl, 1);
o_ASL.addDirection(Ring, DiagonalUpRight, 0.7);
o_ASL.addCurl(Pinky, FullCurl, 1);
o_ASL.addDirection(Pinky, DiagonalUpRight, 0.7);

export const p_ASL = new GestureDescription('P');
p_ASL.addCurl(Thumb, NoCurl, 1.0);
p_ASL.addDirection(Index, HorizontalRight, 0.7);
p_ASL.addCurl(Index, NoCurl, 1);
p_ASL.addDirection(Index, HorizontalRight, 0.7);
p_ASL.addCurl(Middle, HalfCurl, 1);
p_ASL.addDirection(Middle, DiagonalDownRight, 0.7);
p_ASL.addCurl(Ring, FullCurl, 1);
p_ASL.addDirection(Ring, DiagonalDownRight, 0.7);
p_ASL.addCurl(Pinky, FullCurl, 1);
p_ASL.addDirection(Pinky, DiagonalDownRight, 0.7);

export const q_ASL = new GestureDescription('Q');
q_ASL.addCurl(Thumb, NoCurl, 1);
q_ASL.addDirection(Index, DiagonalDownRight, 0.7);
q_ASL.addCurl(Index, HalfCurl, 1);
q_ASL.addDirection(Index, HorizontalRight, 0.7);
q_ASL.addCurl(Middle, FullCurl, 1);
q_ASL.addDirection(Middle, HorizontalRight, 0.7);
q_ASL.addCurl(Ring, FullCurl, 1);
q_ASL.addDirection(Ring, DiagonalDownRight, 0.7);
q_ASL.addCurl(Pinky, FullCurl, 1);
q_ASL.addDirection(Pinky, DiagonalDownRight, 0.7);

export const r_ASL = new GestureDescription('R');
r_ASL.addCurl(Thumb, HalfCurl, 1);
r_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
r_ASL.addCurl(Index, NoCurl, 1);
r_ASL.addDirection(Index, VerticalUp, 0.7);
r_ASL.addCurl(Middle, NoCurl, 1);
r_ASL.addDirection(Middle, VerticalUp, 0.7);
r_ASL.addCurl(Ring, FullCurl, 1);
r_ASL.addDirection(Ring, VerticalUp, 0.7);
r_ASL.addCurl(Pinky, FullCurl, 1);
r_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const s_ASL = new GestureDescription('S');
s_ASL.addCurl(Thumb, HalfCurl, 1);
s_ASL.addDirection(Index, VerticalUp, 0.7);
s_ASL.addCurl(Index, FullCurl, 1);
s_ASL.addDirection(Index, DiagonalUpRight, 0.7);
s_ASL.addCurl(Middle, FullCurl, 1);
s_ASL.addDirection(Middle, VerticalUp, 0.7);
s_ASL.addCurl(Ring, FullCurl, 1);
s_ASL.addDirection(Ring, VerticalUp, 0.7);
s_ASL.addCurl(Pinky, FullCurl, 1);
s_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const t_ASL = new GestureDescription('T');
t_ASL.addCurl(Thumb, NoCurl, 1);
t_ASL.addDirection(Index, VerticalUp, 0.7);
t_ASL.addCurl(Index, FullCurl, 1);
t_ASL.addDirection(Index, DiagonalUpRight, 0.7);
t_ASL.addCurl(Middle, FullCurl, 1);
t_ASL.addDirection(Middle, VerticalUp, 0.7);
t_ASL.addCurl(Ring, FullCurl, 1);
t_ASL.addDirection(Ring, VerticalUp, 0.7);
t_ASL.addCurl(Pinky, FullCurl, 1);
t_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const u_ASL = new GestureDescription('U');
u_ASL.addCurl(Thumb, HalfCurl, 1);
u_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
u_ASL.addCurl(Index, NoCurl, 1);
u_ASL.addDirection(Index, VerticalUp, 0.7);
u_ASL.addCurl(Middle, NoCurl, 1);
u_ASL.addDirection(Middle, VerticalUp, 0.7);
u_ASL.addCurl(Ring, FullCurl, 1);
u_ASL.addDirection(Ring, VerticalUp, 0.7);
u_ASL.addCurl(Pinky, FullCurl, 1);
u_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const v_ASL = new GestureDescription('V');
v_ASL.addCurl(Thumb, HalfCurl, 1);
v_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
v_ASL.addCurl(Index, NoCurl, 1);
v_ASL.addDirection(Index, DiagonalUpRight, 0.7);
v_ASL.addCurl(Middle, NoCurl, 1);
v_ASL.addDirection(Middle, VerticalUp, 0.7);
v_ASL.addCurl(Ring, FullCurl, 1);
v_ASL.addDirection(Ring, VerticalUp, 0.7);
v_ASL.addCurl(Pinky, FullCurl, 1);
v_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const w_ASL = new GestureDescription('W');
w_ASL.addCurl(Thumb, HalfCurl, 1);
w_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
w_ASL.addCurl(Index, NoCurl, 1);
w_ASL.addDirection(Index, DiagonalUpRight, 0.7);
w_ASL.addCurl(Middle, NoCurl, 1);
w_ASL.addDirection(Middle, VerticalUp, 0.7);
w_ASL.addCurl(Ring, NoCurl, 1);
w_ASL.addDirection(Ring, DiagonalUpLeft, 0.7);
w_ASL.addCurl(Pinky, FullCurl, 1);
w_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const x_ASL = new GestureDescription('X');
x_ASL.addCurl(Thumb, HalfCurl, 1);
x_ASL.addDirection(Index, VerticalUp, 0.7);
x_ASL.addCurl(Index, HalfCurl, 1);
x_ASL.addDirection(Index, VerticalUp, 0.7);
x_ASL.addCurl(Middle, FullCurl, 1);
x_ASL.addDirection(Middle, VerticalUp, 0.7);
x_ASL.addCurl(Ring, FullCurl, 1);
x_ASL.addDirection(Ring, VerticalUp, 0.7);
x_ASL.addCurl(Pinky, FullCurl, 1);
x_ASL.addDirection(Pinky, VerticalUp, 0.7);

export const y_ASL = new GestureDescription('Y');
y_ASL.addCurl(Thumb, NoCurl, 1);
y_ASL.addDirection(Index, DiagonalUpRight, 0.7);
y_ASL.addCurl(Index, FullCurl, 1);
y_ASL.addDirection(Index, VerticalUp, 0.7);
y_ASL.addCurl(Middle, FullCurl, 1);
y_ASL.addDirection(Middle, VerticalUp, 0.7);
y_ASL.addCurl(Ring, NoCurl, 1);
y_ASL.addDirection(Ring, VerticalUp, 0.7);
y_ASL.addCurl(Pinky, NoCurl, 1);
y_ASL.addDirection(Pinky, DiagonalUpLeft, 0.7);

export const z_ASL = new GestureDescription('Z');
z_ASL.addCurl(Thumb, NoCurl, 0.8);
z_ASL.addDirection(Index, HorizontalLeft, 0.7);
z_ASL.addCurl(Index, NoCurl, 1);
z_ASL.addDirection(Index, DiagonalUpLeft, 0.7);
z_ASL.addCurl(Middle, FullCurl, 1);
z_ASL.addDirection(Middle, HorizontalLeft, 0.7);
z_ASL.addCurl(Ring, FullCurl, 1);
z_ASL.addDirection(Ring, HorizontalLeft, 0.7);
z_ASL.addCurl(Pinky, FullCurl, 1);
z_ASL.addDirection(Pinky, HorizontalLeft, 0.7);

const aslSigns = {
  a_ASL,
  b_ASL,
  c_ASL,
  d_ASL,
  e_ASL,
  f_ASL,
  g_ASL,
  h_ASL,
  i_ASL,
  j_ASL,
  k_ASL,
  l_ASL,
  m_ASL,
  n_ASL,
  o_ASL,
  p_ASL,
  q_ASL,
  r_ASL,
  s_ASL,
  t_ASL,
  u_ASL,
  v_ASL,
  w_ASL,
  x_ASL,
  y_ASL,
  z_ASL,
};

export default aslSigns;
