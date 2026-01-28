import { UserQueryForm } from '@/src/components/forms/UserQueryForms';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4 text-center gap-6">
        AI Health Insurance Recommendation
      </h1>
      <UserQueryForm />
    </main>
  );
}
