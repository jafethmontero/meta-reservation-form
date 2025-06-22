import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  const originalAlert = window.alert;
  const originalLog = console.log;

  beforeEach(() => {
    window.alert = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    window.alert = originalAlert;
    console.log = originalLog;
    jest.clearAllMocks();
  });

  it("renders all form fields and submit button", () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit reservation/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<BookingForm />);
    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/time is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/number of guests is required/i)
      ).toBeInTheDocument();
    });
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("shows error for invalid email", async () => {
    render(<BookingForm />);
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "invalid" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it("shows error for guests out of range", async () => {
    render(<BookingForm />);
    fireEvent.input(screen.getByLabelText(/guests/i), {
      target: { value: "0" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/at least 1 guest required/i)
      ).toBeInTheDocument();
    });

    fireEvent.input(screen.getByLabelText(/guests/i), {
      target: { value: "21" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/maximum 20 guests/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data and calls alert and console.log", async () => {
    render(<BookingForm />);
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/date/i), {
      target: { value: "2024-12-31" },
    });
    fireEvent.input(screen.getByLabelText(/time/i), {
      target: { value: "18:00" },
    });
    fireEvent.input(screen.getByLabelText(/guests/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/special requests/i), {
      target: { value: "Window seat" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Reservation submitted!");
      expect(console.log).toHaveBeenCalledWith("Booking data:", {
        name: "John Doe",
        email: "john@example.com",
        date: "2024-12-31",
        time: "18:00",
        guests: 4,
        specialRequest: "Window seat",
      });
    });
  });

  it("allows submitting without special request", async () => {
    render(<BookingForm />);
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: "Jane" },
    });
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/date/i), {
      target: { value: "2024-11-11" },
    });
    fireEvent.input(screen.getByLabelText(/time/i), {
      target: { value: "19:30" },
    });
    fireEvent.input(screen.getByLabelText(/guests/i), {
      target: { value: "2" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Reservation submitted!");
      expect(console.log).toHaveBeenCalledWith("Booking data:", {
        name: "Jane",
        email: "jane@example.com",
        date: "2024-11-11",
        time: "19:30",
        guests: 2,
        specialRequest: "",
      });
    });
  });

  it("disables submit button when there are validation errors", async () => {
    render(<BookingForm />);
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "bademail" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /submit reservation/i })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /submit reservation/i })
      ).toBeDisabled();
    });
  });
});
