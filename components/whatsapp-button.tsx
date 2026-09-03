export function WhatsAppButton() {
  const message = encodeURIComponent("Olá... Gostaria de obter maiores informações sobre...");
  return (
    <a className="whatsapp-button" href={`https://wa.me/5541984247771?text=${message}`} target="_blank" rel="noreferrer" aria-label="Falar com a Casa Sol pelo WhatsApp">
      <img src="/casa-sol/whatsapp.png" alt="" />
    </a>
  );
}
