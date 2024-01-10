import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";

export default function EditProfile() {
  return (
    <Layout canGoBack title="프로필 수정">
      <form className="px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
          >
            Change
            <input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        <Input name="email" label="Email address" type="email" required />
        <Input
          name="phone"
          label="Phone number"
          type="number"
          kind="phone"
          required
        />
        <Button text="Update profile" full />
      </form>
    </Layout>
  );
}
