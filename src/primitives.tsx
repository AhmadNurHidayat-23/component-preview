import { useRef, useState, type FormEvent } from 'react';
export interface Config { component: 'button' | 'input' | 'modal' | 'card' | 'form'; label: string; description: string; variant: 'solid' | 'outline' | 'quiet'; size: 'small' | 'medium' | 'large'; disabled: boolean; required: boolean; inputType: 'text' | 'email' | 'number' }
export const initial: Config = { component: 'button', label: 'Simpan perubahan', description: 'Komponen siap digunakan dalam alur kerja Anda.', variant: 'solid', size: 'medium', disabled: false, required: true, inputType: 'text' };
export function PreviewComponent({ config }: { config: Config }) {
  const [notice, setNotice] = useState(''); const [value, setValue] = useState(''); const dialog = useRef<HTMLDialogElement>(null);
  const buttonClass = 'dp-button dp-' + config.variant + ' dp-' + config.size;
  const action = () => setNotice('Tindakan berhasil dijalankan.');
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setNotice(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget)), null, 2)); }
  return <div className="dp-root">
    {config.component === 'button' && <button className={buttonClass} disabled={config.disabled} onClick={action}>{config.label}</button>}
    {config.component === 'input' && <label className="dp-label">{config.label}<input className={'dp-input dp-' + config.size} type={config.inputType} required={config.required} disabled={config.disabled} placeholder={config.description} value={value} onChange={e => setValue(e.target.value)} /><small>Nilai saat ini: {value || '—'}</small></label>}
    {config.component === 'card' && <article className={'dp-card dp-' + config.size}><span className="dp-kicker">KOMPONEN / CARD</span><h2>{config.label}</h2><p>{config.description}</p><button className={buttonClass} disabled={config.disabled} onClick={action}>Buka detail</button></article>}
    {config.component === 'modal' && <><button className={buttonClass} disabled={config.disabled} onClick={() => dialog.current?.showModal()}>{config.label}</button><dialog className="dp-dialog" ref={dialog} aria-labelledby="dp-modal-title" onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><h2 id="dp-modal-title">{config.label}</h2><p>{config.description}</p><div className="dp-actions"><button className="dp-button dp-outline dp-medium" onClick={() => dialog.current?.close()}>Batal</button><button className={buttonClass} onClick={() => { action(); dialog.current?.close(); }}>Konfirmasi</button></div></dialog></>}
    {config.component === 'form' && <form className="dp-form" onSubmit={submit}><h2>{config.label}</h2><p>{config.description}</p><label className="dp-label">Nama<input className={'dp-input dp-' + config.size} name="name" required={config.required} disabled={config.disabled} /></label><label className="dp-label">Email<input className={'dp-input dp-' + config.size} type="email" name="email" required={config.required} disabled={config.disabled} /></label><button type="submit" className={buttonClass} disabled={config.disabled}>Kirim form</button></form>}
    {notice && <output className="dp-notice" role="status">{notice}</output>}
  </div>;
}
