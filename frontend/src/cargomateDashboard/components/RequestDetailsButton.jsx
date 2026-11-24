import React, { useState } from 'react';
import SupportTicketModal from './SupportTicketModal';

export default function RequestDetailsButton({ module, record }) {
  const [open, setOpen] = useState(false);
  const fields = [['Reference', record.shipmentId || record._id], ['Type', record.type], ['HS Code', record.hsCode], ['Product', record.productName], ['Country', record.country], ['Importer', record.importer], ['Supplier', record.supplier], ['Exporter', record.exporter], ['Buyer', record.buyer || record.Cosignee || record.consignee], ['Month', record.month], ['Year', record.year], ['Quantity', record.quantity], ['Value', record.value]];
  const context = ['Source: ' + module, ...fields.filter(([,v]) => v != null && v !== '').map(([k,v]) => `${k}: ${v}`)].join('\n');
  return <><button type="button" onClick={() => setOpen(true)} className="whitespace-nowrap rounded-lg bg-teal-700 px-3 py-2 text-xs font-bold text-white hover:bg-teal-800">Request Details</button>{open && <SupportTicketModal initialCategory="Data Request" initialSubject={`Data Request - ${record.productName || record.hsCode || record.shipmentId || module}`} context={context} onClose={() => setOpen(false)} />}</>;
}
