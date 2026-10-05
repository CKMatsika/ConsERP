import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ plans, activeSubscription }: any) {
    const { post, processing } = useForm({});

    const handleSubscribe = (planId: number) => {
        post(route('subscriptions.subscribe', planId));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">SaaS Subscription Billing</h2>}
        >
            <Head title="Subscriptions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {activeSubscription && (
                        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-green-900">Active Subscription: {activeSubscription.plan?.name}</h3>
                            <p className="text-sm text-green-700 mt-1">Status: {activeSubscription.status} | Expires: {activeSubscription.expires_at || 'N/A'}</p>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Available Plans</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans && plans.length > 0 ? (
                                plans.map((plan: any) => (
                                    <div key={plan.id} className="border rounded-lg p-6 flex flex-col justify-between shadow-sm hover:shadow transition">
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                                            <p className="text-2xl font-extrabold text-indigo-600 mt-2">${plan.price} <span className="text-sm font-normal text-gray-500">/mo</span></p>
                                            <p className="text-sm text-gray-600 mt-4">{plan.description || 'Full platform access.'}</p>
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                onClick={() => handleSubscribe(plan.id)}
                                                disabled={processing}
                                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                                            >
                                                {activeSubscription?.subscription_plan_id === plan.id ? 'Current Plan' : 'Subscribe'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No subscription plans configured yet. Seed subscription plans to enable billing.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
