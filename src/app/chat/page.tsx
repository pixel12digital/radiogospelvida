'use client'

import Container from '../Container';

export default function ChatPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Chat ao Vivo</h1>
      <div className="flex justify-center">
        <div className="bg-[#fff3e6] rounded-xl p-8 shadow-lg text-[#c96a2b] text-lg max-w-lg text-center">
          Em breve você poderá interagir ao vivo com outros ouvintes e locutores!
        </div>
      </div>
    </Container>
  );
} 