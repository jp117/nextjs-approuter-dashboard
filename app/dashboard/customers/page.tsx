import Table from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
    const customers = await fetchFilteredCustomers('');
    const formattedCustomers: FormattedCustomersTable[] = customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices: customer.total_invoices,
        total_pending: customer.total_pending,
        total_paid: customer.total_paid,
    }));

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Table customers={formattedCustomers} />
            </Suspense>
        </main>
    )
  }