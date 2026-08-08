import React from 'react'

export function GameShell({ title, children }:{ title:string; children:React.ReactNode }){
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function SampleMathGame(){
  const [a] = React.useState(Math.ceil(Math.random()*10))
  const [b] = React.useState(Math.ceil(Math.random()*10))
  const [answer, setAnswer] = React.useState('')
  const correct = (parseInt(answer||'0',10) === a + b)
  return (
    <GameShell title="Quick Add">
      <p>What is {a} + {b} ?</p>
      <input value={answer} onChange={e=>setAnswer(e.target.value)} className="border p-2 mt-2" />
      <div className="mt-2">{answer!=='' && (correct ? <span className="text-green-600">Correct!</span> : <span className="text-red-600">Try again</span>)}</div>
    </GameShell>
  )
}
