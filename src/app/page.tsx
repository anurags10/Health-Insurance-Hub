import { UserQueryForm } from '@/src/components/forms/UserQueryForms';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">
        AI Health Insurance Recommendation
      </h1>
      <UserQueryForm />
    </main>
  );
}
