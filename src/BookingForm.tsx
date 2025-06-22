import { useForm } from "react-hook-form";

type BookingFormInputs = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
};

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormInputs>();

  const onSubmit = (data: BookingFormInputs) => {
    console.log("Booking data:", data);
    alert("Reservation submitted!");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Book a Table</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium">
            Time
          </label>
          <input
            id="time"
            type="time"
            {...register("time", { required: "Time is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className="block text-sm font-medium">
            Number of Guests
          </label>
          <input
            id="guests"
            type="number"
            {...register("guests", {
              required: "Number of guests is required",
              min: { value: 1, message: "At least 1 guest required" },
              max: { value: 20, message: "Maximum 20 guests" },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.guests && (
            <p className="text-red-500 text-sm">{errors.guests.message}</p>
          )}
        </div>

        {/* Special Request */}
        <div>
          <label htmlFor="specialRequest" className="block text-sm font-medium">
            Special Requests
          </label>
          <textarea
            id="specialRequest"
            {...register("specialRequest")}
            rows={3}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Optional"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F4CE14] hover:bg-[#fbd000] text-black font-semibold py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Boolean(Object.keys(errors).length > 0)}
        >
          Submit Reservation
        </button>
      </form>
    </div>
  );
}
