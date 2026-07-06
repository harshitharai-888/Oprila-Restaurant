"use client";

import { useEffect, useMemo, useState } from "react";

import Pagination from "../../../components/Pagination";
import ReservationCard from "./ReservationCard";
import ReservationRow from "./ReservationRow";
import Table from "./Table";
import { getAppointments } from "../services/bookingService";

type Reservation = {
  id: number;
  customer: string;
  subtitle: string;
  guests: number;
  table: string;
  status: string;
  source: string;
  time: string;
  approve?: boolean;
  avatar: string;
  avatarColor: string;
  statusColor: string;
};

export default function ReservationTable() {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await getAppointments();

      const mappedReservations: Reservation[] = response.data.items.map(
        (item: any) => ({
          id: item.id,
          customer: item.customerName,
          subtitle: item.customerEmail ?? "",
          guests: item.guestCount,
          table: item.tableNumber,
          status: item.status,
          source: item.source,
          time: item.startTime,

          approve: false,

          avatar: item.customerName
            .split(" ")
            .map((name: string) => name[0])
            .join(""),

          avatarColor: "bg-[#ECECEC]",

          statusColor:
            item.status === "Confirmed"
              ? "green"
              : item.status === "Cancelled"
              ? "red"
              : item.status === "Pending"
              ? "gray"
              : "orange",
        })
      );

      setReservations(mappedReservations);
    }

    loadAppointments();
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(reservations.length / ITEMS_PER_PAGE),
    [reservations]
  );

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1)
  );

  const currentReservations = useMemo(
    () =>
      reservations.slice(
        (safeCurrentPage - 1) * ITEMS_PER_PAGE,
        safeCurrentPage * ITEMS_PER_PAGE
      ),
    [reservations, safeCurrentPage]
  );

  return (
    <>
      <div className="space-y-4 p-4 md:hidden">
        {currentReservations.map((item) => (
          <ReservationCard key={item.id} item={item} />
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-[#ECE8E1] bg-white md:block">
        <Table
          headers={[
            "Customer Name",
            "Date & Time",
            "Guests",
            "Table",
            "Status",
            "Source",
            "Actions",
          ]}
        >
          {currentReservations.map((item) => (
            <ReservationRow key={item.id} item={item} />
          ))}
        </Table>

        <div className="border-t border-[#ECE8E1] px-4 py-4 text-[12px] text-[#7F7A74] lg:px-6 lg:py-5">
          <p>
            Showing{" "}
            {reservations.length === 0
              ? 0
              : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to{" "}
            {Math.min(
              safeCurrentPage * ITEMS_PER_PAGE,
              reservations.length
            )}{" "}
            of {reservations.length} results
          </p>

          <Pagination
            currentPage={safeCurrentPage}
            totalPages={Math.max(totalPages, 1)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}